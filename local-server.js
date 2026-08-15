/**
 * Tech IS Photo Booth — Local Server
 * Pure Node.js, zero npm dependencies.
 * Auto-converts WebM → MP4 via FFmpeg if available.
 * Usage: node local-server.js (or run start.bat)
 */
const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const os     = require('os');
const crypto = require('crypto');
const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const PORT       = 3000;
const UPLOAD_DIR = path.join(__dirname, '.uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
    try { fs.mkdirSync(UPLOAD_DIR, { recursive: true }); } catch (_) {}
}

// Public URL from Cloudflare Tunnel (set after tunnel starts)
let publicUrl = null;

// ── Helpers ──────────────────────────────────────────────────────────────────
function getLocalIP() {
    for (const arr of Object.values(os.networkInterfaces())) {
        for (const i of arr) {
            if (i.family === 'IPv4' && !i.internal) return i.address;
        }
    }
    return 'localhost';
}
const LOCAL_IP = getLocalIP();

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css' : 'text/css',
    '.js'  : 'application/javascript',
    '.png' : 'image/png',
    '.mp4' : 'video/mp4',
    '.webm': 'video/webm',
    '.ico' : 'image/x-icon',
};

// ── Cloudflare Tunnel ────────────────────────────────────────────────────────
const CLOUDFLARED_LOCATIONS = [
    'C:\\Program Files (x86)\\cloudflared\\cloudflared.exe',
    'C:\\Program Files\\cloudflared\\cloudflared.exe',
    'C:\\Users\\biben\\AppData\\Local\\Microsoft\\WinGet\\Links\\cloudflared.exe',
    'cloudflared',
];

function findCloudflared() {
    for (const loc of CLOUDFLARED_LOCATIONS) {
        if (loc === 'cloudflared') return loc;
        if (fs.existsSync(loc)) return `"${loc}"`;
    }
    return 'cloudflared';
}

function startTunnel() {
    return new Promise((resolve) => {
        const bin = findCloudflared();
        console.log('  🌐 Starting Cloudflare Tunnel…');

        let child;
        try {
            const binPath = bin.replace(/^"|"$/g, '');
            child = spawn(binPath, ['tunnel', '--url', `http://localhost:${PORT}`], {
                shell: false,
                windowsHide: true,
            });
        } catch {
            console.log('  ⚠️ cloudflared not found. QR will use local IP only.\n');
            return resolve(null);
        }

        let output = '';
        const handleData = (data) => {
            output += data.toString();
            const match = output.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/);
            if (match && !publicUrl) {
                publicUrl = match[0];
                console.log(`  ✅ Public tunnel ready:`);
                console.log(`     ${publicUrl}`);
                console.log('  📱 QR codes will work from ANY network!\n');
                resolve(publicUrl);
            }
        };

        child.stdout.on('data', handleData);
        child.stderr.on('data', handleData);
        child.on('close', () => { publicUrl = null; });
        child.on('error', () => {
            console.log('  ⚠️ cloudflared failed to start. QR will use local IP only.\n');
            resolve(null);
        });

        setTimeout(() => {
            if (!publicUrl) {
                console.log('  ⚠️ Tunnel timeout. QR will use local IP only.\n');
                resolve(null);
            }
        }, 45000);
    });
}

let ffmpegAvailable = null;
let ffmpegBin = 'ffmpeg';

const FFMPEG_LOCATIONS = [
    'C:\\Users\\biben\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0-full_build\\bin\\ffmpeg.exe',
    'C:\\ProgramData\\chocolatey\\bin\\ffmpeg.exe',
    'C:\\tools\\ffmpeg\\bin\\ffmpeg.exe',
    'C:\\Users\\biben\\scoop\\apps\\ffmpeg\\current\\bin\\ffmpeg.exe',
];

async function checkFFmpeg() {
    if (ffmpegAvailable !== null) return ffmpegAvailable;

    for (const loc of FFMPEG_LOCATIONS) {
        if (fs.existsSync(loc)) {
            ffmpegBin = `"${loc}"`;
            ffmpegAvailable = true;
            console.log(`  ✅ FFmpeg found at:\n     ${loc}`);
            console.log('  🎬 Video will be converted to MP4 automatically.\n');
            return true;
        }
    }

    try {
        await execAsync('ffmpeg -version');
        ffmpegAvailable = true;
        console.log('  ✅ FFmpeg detected in PATH — MP4 conversion enabled.\n');
    } catch {
        ffmpegAvailable = false;
        console.log('  ⚠️ FFmpeg not found — video will be served as WebM.');
        console.log('     To enable MP4: winget install --id Gyan.FFmpeg -e\n');
    }
    return ffmpegAvailable;
}

async function convertToMp4(webmPath) {
    const mp4Path = webmPath.replace(/\.webm$/, '.mp4');
    await execAsync(
        `${ffmpegBin} -y -i "${webmPath}" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p" -c:v libx264 -profile:v baseline -level 3.1 -preset fast -crf 20 -r 10 -pix_fmt yuv420p -movflags +faststart "${mp4Path}"`
    );
    return mp4Path;
}

function getSupabaseConfig() {
    try {
        const cfgPath = path.join(__dirname, 'supabase_config.json');
        if (fs.existsSync(cfgPath)) {
            const raw = fs.readFileSync(cfgPath, 'utf8');
            return JSON.parse(raw);
        }
    } catch (e) {
        console.error('  ⚠️ Error reading supabase_config.json:', e.message);
    }
    return null;
}

async function syncToSupabase(session, filename, filePath, metaParams = {}) {
    const cfg = getSupabaseConfig();
    if (!cfg || !cfg.supabaseUrl || !cfg.supabaseKey) return null;

    try {
        const fileBuf = fs.readFileSync(filePath);
        const ext = path.extname(filename).toLowerCase();
        const mimeType = MIME[ext] || 'application/octet-stream';
        const bucket = cfg.bucket || 'photobooth';
        const tableName = cfg.tableName || 'photobooth_sessions';

        const objectPath = `${session}/${filename}`;
        const uploadUrl = `${cfg.supabaseUrl}/storage/v1/object/${bucket}/${objectPath}`;

        const uploadRes = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'apikey': cfg.supabaseKey,
                'Authorization': `Bearer ${cfg.supabaseKey}`,
                'Content-Type': mimeType,
                'x-upsert': 'true',
            },
            body: fileBuf,
        });

        if (!uploadRes.ok) {
            const errText = await uploadRes.text();
            console.error(`  ⚠️ Supabase storage notice (${uploadRes.status}):`, errText);
        }

        const publicFileUrl = `${cfg.supabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;

        const isPhoto = ext === '.png' || ext === '.jpg';
        const isVideo = ext === '.mp4' || ext === '.webm';
        const frameTheme = metaParams.frame || 'climate';
        const photoFilter = metaParams.filter || 'normal';

        const row = {
            session_code: session,
            frame_theme: frameTheme,
            photo_filter: photoFilter,
            ...(isPhoto ? { photo_filename: filename, photo_url: publicFileUrl } : {}),
            ...(isVideo ? { video_filename: filename, video_url: publicFileUrl } : {}),
            meta: {
                frame_template: frameTheme,
                photo_filter: photoFilter,
                updated_at: new Date().toISOString(),
                local_ip: LOCAL_IP,
                public_tunnel: publicUrl,
            }
        };

        let dbRes = await fetch(`${cfg.supabaseUrl}/rest/v1/${tableName}?on_conflict=session_code`, {
            method: 'POST',
            headers: {
                'apikey': cfg.supabaseKey,
                'Authorization': `Bearer ${cfg.supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates,return=representation',
            },
            body: JSON.stringify(row),
        });

        if (!dbRes.ok && dbRes.status === 400) {
            delete row.photo_filter;
            dbRes = await fetch(`${cfg.supabaseUrl}/rest/v1/${tableName}?on_conflict=session_code`, {
                method: 'POST',
                headers: {
                    'apikey': cfg.supabaseKey,
                    'Authorization': `Bearer ${cfg.supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates,return=representation',
                },
                body: JSON.stringify(row),
            });
        }

        if (dbRes.ok) {
            console.log(`  ☁️ Supabase DB & Storage Synced: ${filename} [Frame: ${frameTheme}, Filter: ${photoFilter}]`);
        } else {
            const dbErr = await dbRes.text();
            console.log(`  ℹ️ Supabase database notice: ${dbErr}`);
        }

        return publicFileUrl;
    } catch (err) {
        console.error('  ⚠️ Supabase sync error:', err.message);
        return null;
    }
}

function serveFile(res, fp, asDownload) {
    if (!fs.existsSync(fp) || !fs.statSync(fp).isFile()) {
        res.writeHead(404); res.end('Not found'); return;
    }
    const headers = {
        'Content-Type'  : MIME[path.extname(fp).toLowerCase()] || 'application/octet-stream',
        'Content-Length': fs.statSync(fp).size,
    };
    if (asDownload) headers['Content-Disposition'] = `attachment; filename="${path.basename(fp)}"`;
    res.writeHead(200, headers);
    fs.createReadStream(fp).pipe(res);
}

function downloadPage(session, files) {
    const photo = files.find(f => f.endsWith('.png'));
    const video = files.find(f => f.endsWith('.mp4')) || files.find(f => f.endsWith('.webm'));
    const videoExt = video ? path.extname(video).slice(1).toUpperCase() : '';

    const cameraSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:8px"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`;
    const videoSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:8px"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`;

    return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tech IS Photo Booth</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d1d17;color:#F2F0E7;
  min-height:100vh;display:flex;flex-direction:column;align-items:center;
  justify-content:center;padding:32px 20px;gap:18px;text-align:center}
.logo{width:64px;height:64px;object-fit:contain;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.3)}
h1{font-size:24px;font-weight:800;letter-spacing:-.02em}
p{font-size:12px;color:#8a9b8f;font-family:monospace;letter-spacing:.05em}
a.btn{display:flex;align-items:center;justify-content:center;background:#173F30;color:#F2F0E7;text-decoration:none;
  padding:16px 24px;border:2px solid #2B5F44;font-weight:700;font-size:15px;
  max-width:320px;width:100%;transition:background .15s;letter-spacing:.02em;border-radius:4px}
a.btn:hover,a.btn:active{background:#2B5F44}
.note{font-size:10px;color:#5b6f62;font-family:monospace;margin-top:8px}
</style></head><body>
<img src="/logo.png" alt="Tech IS" class="logo">
<h1>Tech IS Photo Booth</h1>
<p>TECH IS SOUVENIR &middot; 4 SHOTS &middot; 1 STRIP</p>
${photo ? `<a href="/d/${session}/photo" class="btn">${cameraSvg} Download Photo Strip</a>` : ''}
${video ? `<a href="/d/${session}/video" class="btn">${videoSvg} Download Video Reel (${videoExt})</a>` : ''}
<p class="note">Files available while the Photo Booth session is active.</p>
</body></html>`;
}

// ── Server ────────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    const url      = new URL(req.url, 'http://localhost');
    const pathname = url.pathname;

    // GET /info
    if (req.method === 'GET' && pathname === '/info') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            ip: LOCAL_IP,
            port: PORT,
            ffmpeg: ffmpegAvailable,
            publicUrl,
        }));
        return;
    }

    // POST /upload?session=xxx&filename=yyy&frame=zzz&filter=aaa
    if (req.method === 'POST' && pathname === '/upload') {
        const session    = url.searchParams.get('session') || crypto.randomBytes(6).toString('hex');
        const filename   = path.basename(url.searchParams.get('filename') || 'file');
        const frame      = url.searchParams.get('frame') || 'climate';
        const filter     = url.searchParams.get('filter') || 'normal';
        const sessionDir = path.join(UPLOAD_DIR, session);
        if (!fs.existsSync(sessionDir)) {
            try { fs.mkdirSync(sessionDir, { recursive: true }); } catch (_) {}
        }

        const chunks = [];
        req.on('data', c => chunks.push(c));
        req.on('end', async () => {
            try {
                const savedPath = path.join(sessionDir, filename);
                fs.writeFileSync(savedPath, Buffer.concat(chunks));

                let finalFilename = filename;
                let finalPath = savedPath;

                if (filename.endsWith('.webm') && await checkFFmpeg()) {
                    try {
                        console.log(`  🔄 Converting ${filename} to MP4…`);
                        const mp4Path = await convertToMp4(savedPath);
                        if (fs.existsSync(savedPath)) {
                            try { fs.unlinkSync(savedPath); } catch (_) {}
                        }
                        finalFilename = path.basename(mp4Path);
                        finalPath = mp4Path;
                        console.log(`  ✅ Converted → ${finalFilename}`);
                    } catch (convErr) {
                        console.error('  ❌ FFmpeg conversion error:', convErr.message);
                    }
                }

                syncToSupabase(session, finalFilename, finalPath, { frame, filter }).catch(err => {
                    console.error('  ⚠️ Supabase background sync error:', err);
                });

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    ok: true,
                    session,
                    filename: finalFilename,
                    pageUrl: `http://${LOCAL_IP}:${PORT}/d/${session}`,
                }));
            } catch (e) {
                res.writeHead(500); res.end(e.message);
            }
        });
        req.on('error', e => { res.writeHead(500); res.end(e.message); });
        return;
    }

    // GET /d/:session
    if (req.method === 'GET' && /^\/d\/[^/]+$/.test(pathname)) {
        const session    = pathname.slice(3);
        const sessionDir = path.join(UPLOAD_DIR, session);
        if (!fs.existsSync(sessionDir)) { res.writeHead(404); res.end('Session not found'); return; }
        const files = fs.readdirSync(sessionDir);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(downloadPage(session, files));
        return;
    }

    // GET /d/:session/photo or /d/:session/video
    if (req.method === 'GET' && /^\/d\/[^/]+\/(photo|video)$/.test(pathname)) {
        const [, , session, type] = pathname.split('/');
        const sessionDir = path.join(UPLOAD_DIR, session);
        if (!fs.existsSync(sessionDir)) { res.writeHead(404); res.end('Not found'); return; }
        const files = fs.readdirSync(sessionDir);
        let file;
        if (type === 'photo') {
            file = files.find(f => f.endsWith('.png'));
        } else {
            file = files.find(f => f.endsWith('.mp4')) || files.find(f => f.endsWith('.webm'));
        }
        if (!file) { res.writeHead(404); res.end('File not found'); return; }
        serveFile(res, path.join(sessionDir, file), true);
        return;
    }

    // Static file serving (serves React build in dist/ or root)
    let cleanPath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    cleanPath = cleanPath.split('/').map(s => s.replace(/\.\./g, '')).join(path.sep);

    let distFp = path.join(__dirname, 'dist', cleanPath);
    let rootFp = path.join(__dirname, cleanPath);

    if (fs.existsSync(distFp) && fs.statSync(distFp).isFile()) {
        serveFile(res, distFp, false);
    } else if (fs.existsSync(rootFp) && fs.statSync(rootFp).isFile()) {
        serveFile(res, rootFp, false);
    } else if (fs.existsSync(path.join(__dirname, 'dist', 'index.html'))) {
        serveFile(res, path.join(__dirname, 'dist', 'index.html'), false);
    } else {
        serveFile(res, path.join(__dirname, 'index.html'), false);
    }
    return;

});

server.listen(PORT, '0.0.0.0', () => {
    console.log('\n' + '━'.repeat(43));
    console.log('  🌿 Tech IS Photo Booth — Local Server');
    console.log('━'.repeat(43));
    console.log(`  💻 Browser (booth):  http://localhost:${PORT}`);
    console.log(`  📡 Local network:    http://${LOCAL_IP}:${PORT}`);
    console.log('━'.repeat(43));
    console.log('  Huwag isara ang window na ito.\n');
    checkFFmpeg();
    startTunnel();
    const sb = getSupabaseConfig();
    if (sb && sb.supabaseUrl && sb.supabaseKey) {
        console.log(`  ☁️ Supabase configured (${sb.supabaseUrl})`);
    }
});

module.exports = server;
