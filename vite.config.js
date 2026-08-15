import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

function getLocalIP() {
  for (const arr of Object.values(os.networkInterfaces())) {
    for (const i of (arr || [])) {
      if (i.family === 'IPv4' && !i.internal) return i.address;
    }
  }
  return 'localhost';
}

function photoboothDevPlugin() {
  let publicUrl = null;
  const localIp = getLocalIP();
  let tunnelChild = null;

  const CLOUDFLARED_LOCATIONS = [
    'C:\\Program Files (x86)\\cloudflared\\cloudflared.exe',
    'C:\\Program Files\\cloudflared\\cloudflared.exe',
    'C:\\Users\\biben\\AppData\\Local\\Microsoft\\WinGet\\Links\\cloudflared.exe',
    'cloudflared',
  ];

  function findCloudflared() {
    for (const loc of CLOUDFLARED_LOCATIONS) {
      if (loc === 'cloudflared') return loc;
      if (fs.existsSync(loc)) return loc;
    }
    return null;
  }

  function startTunnel(port) {
    if (tunnelChild) return;
    const bin = findCloudflared();
    if (!bin) return;

    try {
      tunnelChild = spawn(bin, ['tunnel', '--url', `http://localhost:${port}`], {
        windowsHide: true,
      });

      const handleData = (d) => {
        const match = d.toString().match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/);
        if (match && !publicUrl) {
          publicUrl = match[0];
          console.log('\n  ======================================================');
          console.log('  🌐 [Cloudflare Live Tunnel Active]:', publicUrl);
          console.log('  📱 Pwede na i-scan ng kahit sinong phone kahit saan!');
          console.log('  ======================================================\n');
        }
      };

      tunnelChild.stdout?.on('data', handleData);
      tunnelChild.stderr?.on('data', handleData);
    } catch (_) {}
  }

  return {
    name: 'photobooth-dev-middleware',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const addr = server.httpServer?.address();
        const activePort = typeof addr === 'object' && addr ? addr.port : 3000;
        startTunnel(activePort);
      });

      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
        
        if (url.pathname === '/info') {
          const addr = server.httpServer?.address();
          const activePort = typeof addr === 'object' && addr ? addr.port : 3000;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            publicUrl: publicUrl,
            localIp: localIp,
            localUrl: `http://${localIp}:${activePort}`,
          }));
          return;
        }

        if (url.pathname === '/upload' && req.method === 'POST') {
          const uploadDir = path.resolve(process.cwd(), '.uploads');
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          const filename = url.searchParams.get('filename') || 'upload.bin';
          const session = url.searchParams.get('session') || 'unknown';
          const sessionDir = path.join(uploadDir, session);
          if (!fs.existsSync(sessionDir)) {
            fs.mkdirSync(sessionDir, { recursive: true });
          }
          const filePath = path.join(sessionDir, filename);
          const writeStream = fs.createWriteStream(filePath);
          req.pipe(writeStream);
          writeStream.on('finish', () => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({ success: true, path: filePath }));
          });
          writeStream.on('error', (err) => {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          });
          return;
        }

        // Serve uploaded files directly with download headers
        if ((url.pathname === '/upload' || url.pathname.startsWith('/files/')) && req.method === 'GET') {
          const filename = url.searchParams.get('filename') || url.pathname.split('/').pop();
          const session = url.searchParams.get('session') || url.pathname.split('/')[2];
          const filePath = path.resolve(process.cwd(), '.uploads', session, filename);

          if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            const isMp4 = filename.endsWith('.mp4');
            res.writeHead(200, {
              'Content-Type': isMp4 ? 'video/mp4' : 'image/png',
              'Content-Length': stat.size,
              'Content-Disposition': `attachment; filename="${filename}"`,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Cache-Control': 'public, max-age=31536000',
            });
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), photoboothDevPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true, // Payagan ang Cloudflare Tunnel (.trycloudflare.com) at anumang domain
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
