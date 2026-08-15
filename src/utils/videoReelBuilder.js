import {
    THEME,
    FILTER_CSS,
    drawRoundedRect,
    wrapCenterText,
    getLayoutDimensions,
    drawSparkleStar,
    drawSatinBow,
    drawWashiTape,
    renderStickers,
    drawCuteEarth,
    drawCuteBear,
    drawCuteRainbow,
    drawCuteSun,
    drawCuteSmileyHeart,
    drawVectorCamera,
    drawSigmaMewing,
    drawSkibidiIcon,
    drawChillGuy,
    drawRizzlerGoblet,
    drawGrimaceCup,
    drawCapybaraMascot,
    drawAuraFlame
} from './canvasRenderer';

function getSupportedMimeType() {
    const types = [
        'video/mp4;codecs=avc1',
        'video/mp4;codecs=h264',
        'video/mp4',
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm'
    ];
    return types.find(t => {
        try { return MediaRecorder.isTypeSupported(t); } catch (e) { return false; }
    }) || 'video/mp4';
}

let activeReelBuildToken = 0;

/**
 * Builds a 15-second 10fps animated video reel in the exact photo strip layout.
 */
export async function buildVideoReel(videoClips, selectedFrame = 'klique_scallop', selectedFilter = 'normal', logoImg = null, layoutId = '4-cut', stickers = []) {
    const currentToken = ++activeReelBuildToken;
    const count = videoClips?.length || 4;
    const theme = THEME[selectedFrame] || THEME.klique_scallop;
    const styleType = theme.styleType || 'classic_clean';

    const dims = getLayoutDimensions(count, layoutId, styleType);
    const { W, H, PAD, GAP, headerH, footerH, photoW, photoH, isGrid, isOval } = dims;
    const mimeType = getSupportedMimeType();

    // Preload video clips
    const vEls = await Promise.all(videoClips.map(blob => new Promise(resolve => {
        const v = document.createElement('video');
        v.src = URL.createObjectURL(blob);
        v.muted = true;
        v.playsInline = true;
        v.loop = true;
        v.onloadeddata = () => resolve(v);
        v.onerror = () => resolve(null);
    })));

    if (currentToken !== activeReelBuildToken) {
        vEls.forEach(v => { if (v) { v.pause(); URL.revokeObjectURL(v.src); } });
        throw new Error('Cancelled by newer build');
    }

    const rc = document.createElement('canvas');
    rc.width = W; rc.height = H;
    const rctx = rc.getContext('2d', { alpha: false });

    const canvasStream = rc.captureStream(10);
    const recorder = new MediaRecorder(canvasStream, { mimeType, videoBitsPerSecond: 3000000 });
    const chunks = [];
    recorder.ondataavailable = e => { if (e.data && e.data.size > 0) chunks.push(e.data); };
    recorder.start(100);

    // Play all active clips
    await Promise.all(vEls.filter(Boolean).map(v => v.play().catch(() => {})));

    const DURATION = 15000;
    await new Promise(resolve => {
        const endTime = Date.now() + DURATION;
        function drawFrame() {
            if (currentToken !== activeReelBuildToken) {
                resolve();
                return;
            }

            // 1. Background
            rctx.fillStyle = theme.bg;
            rctx.fillRect(0, 0, W, H);

            if (styleType === 'scallop_oval') {
                // ============================================================
                // RED SPARTAN VERTICAL PORTRAIT OVAL VIDEO REEL (Exact 1:1)
                // ============================================================
                vEls.forEach((v, i) => {
                    const cx = W / 2;
                    const cy = headerH + i * (photoH + GAP) + photoH / 2;
                    const rx = photoW / 2; // 275
                    const ry = photoH / 2; // 365
                    const numScallops = 32;
                    const scallopRadius = 18;
                    const stripeThickness = 22;

                    // Petals
                    rctx.save();
                    rctx.fillStyle = '#681B24';
                    for (let s = 0; s < numScallops; s++) {
                        const angle = (s / numScallops) * Math.PI * 2;
                        const px = cx + (rx + 8) * Math.cos(angle);
                        const py = cy + (ry + 8) * Math.sin(angle);
                        rctx.beginPath();
                        rctx.arc(px, py, scallopRadius, 0, Math.PI * 2);
                        rctx.fill();
                    }

                    rctx.fillStyle = '#FBF6EB';
                    for (let s = 0; s < numScallops; s++) {
                        const angle = (s / numScallops) * Math.PI * 2;
                        const px = cx + (rx + 8) * Math.cos(angle);
                        const py = cy + (ry + 8) * Math.sin(angle);
                        rctx.beginPath();
                        rctx.arc(px, py, scallopRadius - 4, 0, Math.PI * 2);
                        rctx.fill();
                    }
                    rctx.restore();

                    // Parallel Vertical Striped Ring
                    rctx.save();
                    rctx.beginPath();
                    rctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
                    rctx.clip();

                    rctx.fillStyle = '#FBF6EB';
                    rctx.fillRect(cx - rx - 20, cy - ry - 20, (rx + 20) * 2, (ry + 20) * 2);

                    const stripeW = 14;
                    rctx.fillStyle = '#681B24';
                    for (let sx = cx - rx - 30; sx < cx + rx + 30; sx += stripeW * 2) {
                        rctx.fillRect(sx, cy - ry - 30, stripeW, (ry + 30) * 2);
                    }
                    rctx.restore();

                    // Inner Video
                    const innerRx = rx - stripeThickness;
                    const innerRy = ry - stripeThickness;

                    rctx.save();
                    rctx.beginPath();
                    rctx.ellipse(cx, cy, innerRx + 1, innerRy + 1, 0, 0, Math.PI * 2);
                    rctx.strokeStyle = '#681B24';
                    rctx.lineWidth = 3;
                    rctx.stroke();

                    rctx.beginPath();
                    rctx.ellipse(cx, cy, innerRx, innerRy, 0, 0, Math.PI * 2);
                    rctx.clip();

                    if (v && v.readyState >= 2) {
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const targetW = innerRx * 2;
                        const targetH = innerRy * 2;
                        const scale = Math.max(targetW / vw, targetH / vh);
                        const sw = vw * scale;
                        const sh = vh * scale;
                        rctx.drawImage(v, cx - sw / 2, cy - sh / 2, sw, sh);
                    } else {
                        rctx.fillStyle = '#681B24';
                        rctx.fillRect(cx - innerRx, cy - innerRy, innerRx * 2, innerRy * 2);
                    }
                    rctx.restore();
                });

                // Typography
                const fy = H - footerH;
                rctx.save();
                rctx.fillStyle = '#681B24';
                rctx.textAlign = 'center';
                rctx.font = 'italic 800 42px "Playfair Display", Georgia, serif';
                rctx.fillText('Red Spartan', W / 2, fy + 65);

                drawSparkleStar(rctx, W / 2 + 145, fy + 52, 13, '#681B24');
                drawSparkleStar(rctx, W / 2 - 145, fy + 52, 13, '#681B24');

                rctx.font = '700 11px "Space Mono", monospace';
                rctx.letterSpacing = '3px';
                rctx.globalAlpha = 0.8;
                rctx.fillText('✦ VINTAGE SOUVENIR · 2026 ✦', W / 2, fy + 98);
                rctx.restore();

            } else if (styleType.startsWith('climate_t')) {
                // CLIMATE ACTION VIDEO REEL
                const tNum = parseInt(styleType.replace('climate_t', ''), 10) || 1;

                rctx.save();
                rctx.textAlign = 'center';
                if (tNum === 1) {
                    rctx.fillStyle = '#1B4332';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 40);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillText('CLIMATE ACTION · PROTECT EARTH', W / 2, 60);
                } else if (tNum === 2) {
                    rctx.fillStyle = '#2D5A27';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 40);
                    drawCuteBear(rctx, W - 50, 42, 28);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillText('CLIMATE ACTION', W / 2, 60);
                } else if (tNum === 3) {
                    drawWashiTape(rctx, 36, 12, 46, 16, -14, '#CDB4DB');
                    drawCuteRainbow(rctx, W - 55, 45, 22);
                    rctx.fillStyle = '#5E4B8B';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 40);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillText('♡ CLIMATE ACTION ♡', W / 2, 60);
                } else if (tNum === 4) {
                    drawVectorCamera(rctx, 28, '#8C6239');
                    rctx.fillStyle = '#4A3525';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 40);
                    rctx.font = '800 10.5px "Space Mono", monospace';
                    rctx.fillText('CLIMATE ACTION · PROTECT OUR FUTURE', W / 2, 60);
                } else if (tNum === 5) {
                    drawWashiTape(rctx, W - 60, 12, 48, 16, 15, '#FFCCD5');
                    rctx.fillStyle = '#C9184A';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 40);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillText('CLIMATE ACTION', W / 2, 60);
                } else if (tNum === 6) {
                    drawCuteSun(rctx, W - 48, 38, 28);
                    rctx.fillStyle = '#0369A1';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 40);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillText('CLIMATE ACTION', W / 2, 60);
                } else if (tNum === 7) {
                    drawWashiTape(rctx, W - 55, 14, 46, 16, 18, '#90E0EF');
                    rctx.fillStyle = '#1E3A8A';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 40);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillText('— CLIMATE ACTION —', W / 2, 60);
                } else {
                    drawWashiTape(rctx, 38, 14, 44, 16, -15, '#D8B4E2');
                    rctx.fillStyle = '#6B21A8';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 40);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillText('CLIMATE ACTION', W / 2, 60);
                }
                rctx.restore();

                vEls.forEach((v, i) => {
                    let px = PAD;
                    let py = headerH + i * (photoH + GAP);
                    if (isGrid) {
                        const col = i % 2;
                        const row = Math.floor(i / 2);
                        px = PAD + col * (photoW + GAP);
                        py = headerH + row * (photoH + GAP);
                    }

                    if (v && v.readyState >= 2) {
                        rctx.save();
                        drawRoundedRect(rctx, px, py, photoW, photoH, 8);
                        rctx.clip();
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const slotRatio = photoW / photoH;
                        let sw = vw, sh = vh, sx = 0, sy = 0;
                        if (vw / vh > slotRatio) {
                            sw = vh * slotRatio; sx = (vw - sw) / 2;
                        } else {
                            sh = vw / slotRatio; sy = (vh - sh) / 2;
                        }
                        rctx.drawImage(v, sx, sy, sw, sh, px, py, photoW, photoH);
                        rctx.restore();
                    }

                    rctx.strokeStyle = theme.line || '#333333';
                    rctx.lineWidth = 2.5;
                    drawRoundedRect(rctx, px, py, photoW, photoH, 8);
                    rctx.stroke();

                    rctx.save();
                    rctx.fillStyle = theme.accentColor || theme.line;
                    drawRoundedRect(rctx, px + 6, py + 6, 20, 20, 5);
                    rctx.fill();
                    rctx.fillStyle = '#FFFFFF';
                    rctx.font = '800 11px Archivo, sans-serif';
                    rctx.textAlign = 'center';
                    rctx.textBaseline = 'middle';
                    rctx.fillText(String(i + 1), px + 16, py + 16);
                    rctx.restore();
                });

                const fy = H - footerH;
                rctx.save();
                if (tNum === 1) {
                    drawCuteEarth(rctx, W - 80, fy + 54, 30);
                    rctx.fillStyle = '#FFFFFF';
                    drawRoundedRect(rctx, 36, fy + 32, W - 140, 44, 8);
                    rctx.fill();
                    rctx.strokeStyle = '#1B4332';
                    rctx.lineWidth = 2;
                    drawRoundedRect(rctx, 36, fy + 32, W - 140, 44, 8);
                    rctx.stroke();
                    rctx.fillStyle = '#1B4332';
                    rctx.font = '900 15px Archivo, sans-serif';
                    rctx.textAlign = 'center';
                    rctx.fillText('THINK GREEN', 36 + (W - 140) / 2, fy + 48);
                    rctx.font = '700 11px "Space Mono", monospace';
                    rctx.fillText('LIVE CLEAN ✦', 36 + (W - 140) / 2, fy + 66);
                } else if (tNum === 2) {
                    drawCuteBear(rctx, 70, fy + 52, 42);
                    drawCuteEarth(rctx, W - 65, fy + 52, 26);
                    rctx.fillStyle = '#FFFDF5';
                    drawRoundedRect(rctx, 116, fy + 32, W - 200, 42, 8);
                    rctx.fill();
                    rctx.strokeStyle = '#2D5A27';
                    rctx.lineWidth = 1.8;
                    drawRoundedRect(rctx, 116, fy + 32, W - 200, 42, 8);
                    rctx.stroke();
                    rctx.fillStyle = '#2D5A27';
                    rctx.font = '800 12px Archivo, sans-serif';
                    rctx.textAlign = 'center';
                    rctx.fillText('SMALL ACTIONS', 116 + (W - 200) / 2, fy + 48);
                    rctx.font = '700 10px "Space Mono", monospace';
                    rctx.fillText('BIG IMPACT ♡', 116 + (W - 200) / 2, fy + 64);
                } else if (tNum === 3) {
                    drawCuteEarth(rctx, W - 75, fy + 54, 30);
                    rctx.fillStyle = '#FFFFFF';
                    drawRoundedRect(rctx, 40, fy + 32, W - 135, 42, 8);
                    rctx.fill();
                    rctx.strokeStyle = '#5E4B8B';
                    rctx.lineWidth = 2;
                    drawRoundedRect(rctx, 40, fy + 32, W - 135, 42, 8);
                    rctx.stroke();
                    rctx.fillStyle = '#5E4B8B';
                    rctx.font = '800 12px Archivo, sans-serif';
                    rctx.textAlign = 'center';
                    rctx.fillText('LET\'S HEAL', 40 + (W - 135) / 2, fy + 48);
                    rctx.font = '700 10px "Space Mono", monospace';
                    rctx.fillText('OUR PLANET ✦', 40 + (W - 135) / 2, fy + 64);
                } else if (tNum === 4) {
                    drawCuteEarth(rctx, W - 75, fy + 54, 28);
                    rctx.fillStyle = '#FFF9F0';
                    drawRoundedRect(rctx, 40, fy + 32, W - 135, 44, 6);
                    rctx.fill();
                    rctx.strokeStyle = '#4A3525';
                    rctx.lineWidth = 2;
                    drawRoundedRect(rctx, 40, fy + 32, W - 135, 44, 6);
                    rctx.stroke();
                    rctx.fillStyle = '#4A3525';
                    rctx.font = '800 12px Archivo, sans-serif';
                    rctx.textAlign = 'center';
                    rctx.fillText('BE THE CHANGE', 40 + (W - 135) / 2, fy + 48);
                    rctx.font = '700 9.5px "Space Mono", monospace';
                    rctx.fillText('NOT THE CAUSE ✦', 40 + (W - 135) / 2, fy + 65);
                } else if (tNum === 5) {
                    drawCuteSmileyHeart(rctx, W - 70, fy + 52, 42, '#FF758F');
                    rctx.fillStyle = '#FFFFFF';
                    drawRoundedRect(rctx, 40, fy + 32, W - 135, 42, 8);
                    rctx.fill();
                    rctx.strokeStyle = '#C9184A';
                    rctx.lineWidth = 2;
                    drawRoundedRect(rctx, 40, fy + 32, W - 135, 42, 8);
                    rctx.stroke();
                    rctx.fillStyle = '#C9184A';
                    rctx.font = '800 12px Archivo, sans-serif';
                    rctx.textAlign = 'center';
                    rctx.fillText('SAVE TODAY', 40 + (W - 135) / 2, fy + 48);
                    rctx.font = '700 9.5px "Space Mono", monospace';
                    rctx.fillText('SAVE TOMORROW ♡', 40 + (W - 135) / 2, fy + 64);
                } else if (tNum === 6) {
                    drawCuteEarth(rctx, W - 75, fy + 52, 28);
                    rctx.fillStyle = '#FFF8E7';
                    drawRoundedRect(rctx, 36, fy + 30, W - 130, 46, 6);
                    rctx.fill();
                    rctx.strokeStyle = '#0369A1';
                    rctx.lineWidth = 1.8;
                    drawRoundedRect(rctx, 36, fy + 30, W - 130, 46, 6);
                    rctx.stroke();
                    rctx.fillStyle = '#0369A1';
                    rctx.font = '800 11px Archivo, sans-serif';
                    rctx.textAlign = 'center';
                    rctx.fillText('ONE PLANET · ONE FUTURE', 36 + (W - 130) / 2, fy + 48);
                    rctx.font = '700 9px "Space Mono", monospace';
                    rctx.fillText('ONE CHANCE ✦', 36 + (W - 130) / 2, fy + 65);
                } else if (tNum === 7) {
                    drawCuteEarth(rctx, W - 75, fy + 54, 28);
                    rctx.fillStyle = '#FFFFFF';
                    drawRoundedRect(rctx, 40, fy + 32, W - 135, 42, 6);
                    rctx.fill();
                    rctx.strokeStyle = '#1E3A8A';
                    rctx.lineWidth = 2;
                    drawRoundedRect(rctx, 40, fy + 32, W - 135, 42, 6);
                    rctx.stroke();
                    rctx.fillStyle = '#1E3A8A';
                    rctx.font = '800 12px Archivo, sans-serif';
                    rctx.textAlign = 'center';
                    rctx.fillText('GOOD PLANET', 40 + (W - 135) / 2, fy + 48);
                    rctx.font = '700 10px "Space Mono", monospace';
                    rctx.fillText('GOOD LIFE ♡', 40 + (W - 135) / 2, fy + 64);
                } else {
                    drawCuteEarth(rctx, W - 75, fy + 54, 28);
                    rctx.fillStyle = '#FFFFFF';
                    drawRoundedRect(rctx, 40, fy + 32, W - 135, 42, 6);
                    rctx.fill();
                    rctx.strokeStyle = '#6B21A8';
                    rctx.lineWidth = 2;
                    drawRoundedRect(rctx, 40, fy + 32, W - 135, 42, 6);
                    rctx.stroke();
                    rctx.fillStyle = '#6B21A8';
                    rctx.font = '800 12px Archivo, sans-serif';
                    rctx.textAlign = 'center';
                    rctx.fillText('CARE TODAY', 40 + (W - 135) / 2, fy + 48);
                    rctx.font = '700 9.5px "Space Mono", monospace';
                    rctx.fillText('THRIVE TOMORROW ♡', 40 + (W - 135) / 2, fy + 64);
                }
                rctx.restore();

            } else if (styleType.startsWith('brainrot_')) {
                // BRAINROT MEME VIDEO REEL
                rctx.save();
                rctx.textAlign = 'center';

                if (styleType === 'brainrot_sigma') {
                    drawSigmaMewing(rctx, W - 46, 38, 32);
                    drawSparkleStar(rctx, 42, 38, 12, '#FFD700');
                    rctx.fillStyle = '#FFD700';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 38);
                    rctx.font = '800 11.5px "Space Mono", monospace';
                    rctx.fillStyle = '#00E5FF';
                    rctx.fillText('🤫🧏‍♂️ BYE BYE · MEWING ARCHIVE', W / 2, 58);
                } else if (styleType === 'brainrot_skibidi') {
                    drawSkibidiIcon(rctx, W - 46, 38, 30);
                    drawSkibidiIcon(rctx, 46, 38, 30);
                    rctx.fillStyle = '#00F0FF';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 38);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillStyle = '#FF0055';
                    rctx.fillText('🚽 SKIBIDI RIZZ DOP DOP 🚽', W / 2, 58);
                } else if (styleType === 'brainrot_chill') {
                    drawChillGuy(rctx, W - 48, 38, 30);
                    rctx.fillStyle = '#4A3525';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 38);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillStyle = '#8C6239';
                    rctx.fillText('🧢 JUST A CHILL GUY ☕', W / 2, 58);
                } else if (styleType === 'brainrot_rizzler') {
                    drawRizzlerGoblet(rctx, W - 48, 38, 30);
                    rctx.fillStyle = '#FFE6A7';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 38);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillStyle = '#FF4D6D';
                    rctx.fillText('🍷 UNSPOKEN W RIZZ ✦', W / 2, 58);
                } else if (styleType === 'brainrot_grimace') {
                    drawGrimaceCup(rctx, W - 46, 38, 30);
                    rctx.fillStyle = '#E0AAFF';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 38);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillStyle = '#70E000';
                    rctx.fillText('👾 LEVEL 100 GYATT ⚡', W / 2, 58);
                } else if (styleType === 'brainrot_capybara') {
                    drawCapybaraMascot(rctx, W - 48, 38, 32);
                    rctx.fillStyle = '#7F4F24';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 38);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillStyle = '#F77F00';
                    rctx.fillText('🦫 OK I PULL UP · COCONUT DOG 🍊', W / 2, 58);
                } else {
                    drawAuraFlame(rctx, W - 46, 38, 30);
                    drawAuraFlame(rctx, 46, 38, 30);
                    rctx.fillStyle = '#CCFF00';
                    rctx.font = '900 28px Archivo, sans-serif';
                    rctx.fillText('TECH IS', W / 2, 38);
                    rctx.font = '800 11px "Space Mono", monospace';
                    rctx.fillStyle = '#FF0033';
                    rctx.fillText('💥 1,000,000 AURA · WHAT DA HELL 💥', W / 2, 58);
                }
                rctx.restore();

                vEls.forEach((v, i) => {
                    let px = PAD;
                    let py = headerH + i * (photoH + GAP);
                    if (isGrid) {
                        const col = i % 2;
                        const row = Math.floor(i / 2);
                        px = PAD + col * (photoW + GAP);
                        py = headerH + row * (photoH + GAP);
                    }

                    if (v && v.readyState >= 2) {
                        rctx.save();
                        drawRoundedRect(rctx, px, py, photoW, photoH, 8);
                        rctx.clip();
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const slotRatio = photoW / photoH;
                        let sw = vw, sh = vh, sx = 0, sy = 0;
                        if (vw / vh > slotRatio) {
                            sw = vh * slotRatio; sx = (vw - sw) / 2;
                        } else {
                            sh = vw / slotRatio; sy = (vh - sh) / 2;
                        }
                        rctx.drawImage(v, sx, sy, sw, sh, px, py, photoW, photoH);
                        rctx.restore();
                    }

                    rctx.strokeStyle = theme.line || '#FFD700';
                    rctx.lineWidth = 2.8;
                    drawRoundedRect(rctx, px, py, photoW, photoH, 8);
                    rctx.stroke();

                    rctx.save();
                    rctx.fillStyle = theme.accentColor || '#00E5FF';
                    drawRoundedRect(rctx, px + 6, py + 6, 26, 20, 5);
                    rctx.fill();
                    rctx.fillStyle = '#000000';
                    rctx.font = '900 10px Archivo, sans-serif';
                    rctx.textAlign = 'center';
                    rctx.textBaseline = 'middle';
                    const memeTags = ['#1', 'MOG', 'RIZZ', 'AURA'];
                    rctx.fillText(memeTags[i % memeTags.length], px + 19, py + 16);
                    rctx.restore();
                });

                const fy = H - footerH;
                rctx.save();
                rctx.textAlign = 'center';
                if (styleType === 'brainrot_sigma') {
                    drawSigmaMewing(rctx, W / 2, fy + 44, 38);
                    rctx.fillStyle = '#FFD700';
                    rctx.font = '900 15px Archivo, sans-serif';
                    rctx.fillText('BYE BYE 🤫🧏‍♂️ · 10,000+ AURA', W / 2, fy + 78);
                    rctx.font = '700 10px "Space Mono", monospace';
                    rctx.fillStyle = '#00E5FF';
                    rctx.fillText('TECH IS · SIGMA ARCHIVE · 2026', W / 2, fy + 94);
                } else if (styleType === 'brainrot_skibidi') {
                    drawSkibidiIcon(rctx, W / 2, fy + 42, 38);
                    rctx.fillStyle = '#00F0FF';
                    rctx.font = '900 15px Archivo, sans-serif';
                    rctx.fillText('SKIBIDI DOP DOP YES YES', W / 2, fy + 78);
                    rctx.font = '700 10px "Space Mono", monospace';
                    rctx.fillStyle = '#FF0055';
                    rctx.fillText('TECH IS · BRAINROT EDITION · 2026', W / 2, fy + 94);
                } else if (styleType === 'brainrot_chill') {
                    drawChillGuy(rctx, W / 2, fy + 42, 38);
                    rctx.fillStyle = '#4A3525';
                    rctx.font = '900 15px Archivo, sans-serif';
                    rctx.fillText('JUST A CHILL GUY AT TECH IS', W / 2, fy + 78);
                    rctx.font = '700 10px "Space Mono", monospace';
                    rctx.fillStyle = '#8C6239';
                    rctx.fillText('☕ UNBOTHERED · FULLY RELAXED · 2026', W / 2, fy + 94);
                } else if (styleType === 'brainrot_rizzler') {
                    drawRizzlerGoblet(rctx, W / 2, fy + 42, 38);
                    rctx.fillStyle = '#FFE6A7';
                    rctx.font = '900 15px Archivo, sans-serif';
                    rctx.fillText('UNSPOKEN RIZZ · W RIZZ ONLY', W / 2, fy + 78);
                    rctx.font = '700 10px "Space Mono", monospace';
                    rctx.fillStyle = '#FF4D6D';
                    rctx.fillText('TECH IS · NO CAP · 2026 ✦', W / 2, fy + 94);
                } else if (styleType === 'brainrot_grimace') {
                    drawGrimaceCup(rctx, W / 2, fy + 42, 38);
                    rctx.fillStyle = '#E0AAFF';
                    rctx.font = '900 15px Archivo, sans-serif';
                    rctx.fillText('LEVEL 100 GYATT · GRIMACE SHAKE', W / 2, fy + 78);
                    rctx.font = '700 10px "Space Mono", monospace';
                    rctx.fillStyle = '#70E000';
                    rctx.fillText('⚡ TECH IS · CHAOS CERTIFIED · 2026 ⚡', W / 2, fy + 94);
                } else if (styleType === 'brainrot_capybara') {
                    drawCapybaraMascot(rctx, W / 2, fy + 42, 40);
                    rctx.fillStyle = '#7F4F24';
                    rctx.font = '900 14px Archivo, sans-serif';
                    rctx.fillText('OK I PULL UP 🦫 COCONUT DOG', W / 2, fy + 78);
                    rctx.font = '700 10px "Space Mono", monospace';
                    rctx.fillStyle = '#F77F00';
                    rctx.fillText('🍊 HOP OUT AT THE AFTER PARTY ✦', W / 2, fy + 94);
                } else {
                    drawAuraFlame(rctx, W / 2, fy + 42, 38);
                    rctx.fillStyle = '#CCFF00';
                    rctx.font = '900 15px Archivo, sans-serif';
                    rctx.fillText('💥 WHAT DA HEELL · 1,000,000 AURA 💥', W / 2, fy + 78);
                    rctx.font = '700 10px "Space Mono", monospace';
                    rctx.fillStyle = '#FF0033';
                    rctx.fillText('TECH IS · ULTIMATE BRAINROT · 2026', W / 2, fy + 94);
                }
                rctx.restore();

            } else if (styleType === 'film_35mm') {
                // SPROCKETS
                const holeW = 12, holeH = 18, holeGap = 28;
                rctx.fillStyle = '#FFFFFF';
                for (let y = 14; y < H - 14; y += holeGap) {
                    drawRoundedRect(rctx, 8, y, holeW, holeH, 3);
                    rctx.fill();
                    drawRoundedRect(rctx, W - 8 - holeW, y, holeW, holeH, 3);
                    rctx.fill();
                }

                vEls.forEach((v, i) => {
                    const py = headerH + i * (photoH + GAP);
                    const px = PAD + 10;
                    const pw = photoW - 20;

                    if (v && v.readyState >= 2) {
                        rctx.save();
                        drawRoundedRect(rctx, px, py, pw, photoH, 4);
                        rctx.clip();
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const slotRatio = pw / photoH;
                        let sw = vw, sh = vh, sx = 0, sy = 0;
                        if (vw / vh > slotRatio) {
                            sw = vh * slotRatio; sx = (vw - sw) / 2;
                        } else {
                            sh = vw / slotRatio; sy = (vh - sh) / 2;
                        }
                        rctx.drawImage(v, sx, sy, sw, sh, px, py, pw, photoH);
                        rctx.restore();
                    }

                    rctx.strokeStyle = '#282828';
                    rctx.lineWidth = 2;
                    drawRoundedRect(rctx, px, py, pw, photoH, 4);
                    rctx.stroke();

                    rctx.fillStyle = '#F4B41A';
                    rctx.font = '700 9px "Space Mono", monospace';
                    rctx.textAlign = 'left';
                    rctx.fillText(`▶ ${24 + i}A · TECH IS KODAK 400`, px + 6, py - 3);
                });

                rctx.fillStyle = '#F4B41A';
                rctx.textAlign = 'center';
                rctx.font = '800 20px Archivo, sans-serif';
                rctx.fillText('TECH IS · KODAK PORTRA 400', W / 2, 42);
                rctx.font = '700 10px "Space Mono", monospace';
                rctx.globalAlpha = 0.8;
                rctx.fillText('TECH IS SOUVENIR · ISO 400 · PROCESS C-41', W / 2, 60);
                rctx.globalAlpha = 1;

                const fy = H - footerH;
                rctx.fillText('EXP 24 · TECH IS 35MM ARCHIVE · 2026', W / 2, fy + 40);

            } else if (styleType === 'spartan_crimson') {
                // RED SPARTAN VARSITY REEL
                rctx.fillStyle = '#F4B41A';
                rctx.textAlign = 'center';
                rctx.font = '800 24px Archivo, sans-serif';
                rctx.fillText('TECH IS · RED SPARTAN', W / 2, 42);
                rctx.font = '700 10.5px "Space Mono", monospace';
                rctx.letterSpacing = '3px';
                rctx.fillText('✦ TECH IS · BATSTATE-U · LEAD THE WAY · 2026 ✦', W / 2, 62);

                vEls.forEach((v, i) => {
                    let px = PAD;
                    let py = headerH + i * (photoH + GAP);
                    if (isGrid) {
                        const col = i % 2;
                        const row = Math.floor(i / 2);
                        px = PAD + col * (photoW + GAP);
                        py = headerH + row * (photoH + GAP);
                    }

                    if (v && v.readyState >= 2) {
                        rctx.save();
                        drawRoundedRect(rctx, px, py, photoW, photoH, 8);
                        rctx.clip();
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const slotRatio = photoW / photoH;
                        let sw = vw, sh = vh, sx = 0, sy = 0;
                        if (vw / vh > slotRatio) {
                            sw = vh * slotRatio; sx = (vw - sw) / 2;
                        } else {
                            sh = vw / slotRatio; sy = (vh - sh) / 2;
                        }
                        rctx.drawImage(v, sx, sy, sw, sh, px, py, photoW, photoH);
                        rctx.restore();
                    }

                    rctx.strokeStyle = '#F4B41A';
                    rctx.lineWidth = 3;
                    drawRoundedRect(rctx, px, py, photoW, photoH, 8);
                    rctx.stroke();

                    rctx.strokeStyle = '#681B24';
                    rctx.lineWidth = 1.5;
                    drawRoundedRect(rctx, px + 4, py + 4, photoW - 8, photoH - 8, 6);
                    rctx.stroke();

                    drawSparkleStar(rctx, px + 10, py + 10, 8, '#F4B41A');
                    drawSparkleStar(rctx, px + photoW - 10, py + 10, 8, '#F4B41A');
                });

                const fy = H - footerH;
                rctx.save();
                rctx.fillStyle = '#F4B41A';
                rctx.textAlign = 'center';
                rctx.font = 'italic 800 36px "Playfair Display", Georgia, serif';
                rctx.fillText('Red Spartan', W / 2, fy + 48);
                drawSparkleStar(rctx, W / 2 + 130, fy + 38, 12, '#F4B41A');
                drawSparkleStar(rctx, W / 2 - 130, fy + 38, 12, '#F4B41A');
                rctx.font = '700 10px "Space Mono", monospace';
                rctx.letterSpacing = '2px';
                rctx.fillText('✦ TECH IS OFFICIAL PHOTO BOOTH · 2026 ✦', W / 2, fy + 78);
                rctx.restore();

            } else if (styleType === 'cherry_velvet') {
                // CHERRY RED VELVET REEL
                rctx.fillStyle = '#FFF0F3';
                rctx.textAlign = 'center';
                rctx.font = 'italic 700 28px "Playfair Display", Georgia, serif';
                rctx.fillText('Tech IS · Cherry Memories', W / 2, 46);
                rctx.font = '700 10.5px "Space Mono", monospace';
                rctx.fillText('♡ TECH IS · FRENCH CHERRY RED EDITION ♡', W / 2, 66);

                vEls.forEach((v, i) => {
                    let px = PAD;
                    let py = headerH + i * (photoH + GAP);
                    if (isGrid) {
                        const col = i % 2;
                        const row = Math.floor(i / 2);
                        px = PAD + col * (photoW + GAP);
                        py = headerH + row * (photoH + GAP);
                    }

                    if (v && v.readyState >= 2) {
                        rctx.save();
                        drawRoundedRect(rctx, px, py, photoW, photoH, 10);
                        rctx.clip();
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const slotRatio = photoW / photoH;
                        let sw = vw, sh = vh, sx = 0, sy = 0;
                        if (vw / vh > slotRatio) {
                            sw = vh * slotRatio; sx = (vw - sw) / 2;
                        } else {
                            sh = vw / slotRatio; sy = (vh - sh) / 2;
                        }
                        rctx.drawImage(v, sx, sy, sw, sh, px, py, photoW, photoH);
                        rctx.restore();
                    }

                    rctx.strokeStyle = '#FFFFFF';
                    rctx.lineWidth = 3;
                    drawRoundedRect(rctx, px, py, photoW, photoH, 10);
                    rctx.stroke();

                    drawSatinBow(rctx, px + photoW / 2, py, 18, '#FFCCD5');
                });

                const fy = H - footerH;
                rctx.fillStyle = '#FFF0F3';
                rctx.textAlign = 'center';
                rctx.font = 'italic 700 24px "Playfair Display", serif';
                rctx.fillText('Sweetest Moments', W / 2, fy + 40);
                rctx.font = '700 10px "Space Mono", monospace';
                rctx.fillText('♡ TECH IS CHERRY VELVET ARCHIVE · 2026 ♡', W / 2, fy + 64);

            } else if (styleType === 'cyber_scarlet') {
                // SCARLET CYBER RED REEL
                rctx.fillStyle = '#FFFFFF';
                rctx.textAlign = 'center';
                rctx.font = '900 26px Archivo, sans-serif';
                rctx.fillText('// TECH IS · SCARLET VAULT //', W / 2, 46);
                rctx.font = '700 10.5px "Space Mono", monospace';
                rctx.fillText('★ TECH IS · Y2K CYBER RED EDITION · 2026 ★', W / 2, 66);

                vEls.forEach((v, i) => {
                    let px = PAD;
                    let py = headerH + i * (photoH + GAP);
                    if (isGrid) {
                        const col = i % 2;
                        const row = Math.floor(i / 2);
                        px = PAD + col * (photoW + GAP);
                        py = headerH + row * (photoH + GAP);
                    }

                    if (v && v.readyState >= 2) {
                        rctx.save();
                        drawRoundedRect(rctx, px, py, photoW, photoH, 6);
                        rctx.clip();
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const slotRatio = photoW / photoH;
                        let sw = vw, sh = vh, sx = 0, sy = 0;
                        if (vw / vh > slotRatio) {
                            sw = vh * slotRatio; sx = (vw - sw) / 2;
                        } else {
                            sh = vw / slotRatio; sy = (vh - sh) / 2;
                        }
                        rctx.drawImage(v, sx, sy, sw, sh, px, py, photoW, photoH);
                        rctx.restore();
                    }

                    rctx.strokeStyle = '#FFFFFF';
                    rctx.lineWidth = 3;
                    drawRoundedRect(rctx, px, py, photoW, photoH, 6);
                    rctx.stroke();

                    drawSparkleStar(rctx, px + photoW - 12, py + 12, 11, '#FFD166');
                    drawSparkleStar(rctx, px + 12, py + photoH - 12, 11, '#FFD166');
                });

                const fy = H - footerH;
                rctx.fillStyle = '#FFFFFF';
                rctx.textAlign = 'center';
                rctx.font = '800 22px Archivo, sans-serif';
                rctx.fillText('★ TECH IS · SCARLET SPEED & GLORY ★', W / 2, fy + 42);

            } else if (styleType === 'coquette') {
                vEls.forEach((v, i) => {
                    const py = headerH + i * (photoH + GAP);
                    if (v && v.readyState >= 2) {
                        rctx.save();
                        drawRoundedRect(rctx, PAD, py, photoW, photoH, 12);
                        rctx.clip();
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const slotRatio = photoW / photoH;
                        let sw = vw, sh = vh, sx = 0, sy = 0;
                        if (vw / vh > slotRatio) {
                            sw = vh * slotRatio; sx = (vw - sw) / 2;
                        } else {
                            sh = vw / slotRatio; sy = (vh - sh) / 2;
                        }
                        rctx.drawImage(v, sx, sy, sw, sh, PAD, py, photoW, photoH);
                        rctx.restore();
                    }

                    rctx.strokeStyle = '#FFCCD5';
                    rctx.lineWidth = 3;
                    drawRoundedRect(rctx, PAD, py, photoW, photoH, 12);
                    rctx.stroke();

                    drawSatinBow(rctx, W / 2, py, 18, '#FF758F');
                });

                rctx.fillStyle = '#C9184A';
                rctx.textAlign = 'center';
                rctx.font = 'italic 700 28px "Playfair Display", Georgia, serif';
                rctx.fillText('Tech IS · Cherished Moments', W / 2, 48);
                rctx.font = '700 11px "Space Mono", monospace';
                rctx.fillText('♡ TECH IS · SWEET EDITION PHOTO BOOTH ♡', W / 2, 68);

                const fy = H - footerH;
                rctx.font = 'italic 700 22px "Playfair Display", serif';
                rctx.fillText('Forever & Always', W / 2, fy + 36);
                rctx.font = '700 10px "Space Mono", monospace';
                rctx.fillText('♡ TECH IS · 2026 PHOTO ARCHIVE ♡', W / 2, fy + 56);

            } else if (styleType === 'y2k_stars') {
                vEls.forEach((v, i) => {
                    const py = headerH + i * (photoH + GAP);
                    if (v && v.readyState >= 2) {
                        rctx.save();
                        drawRoundedRect(rctx, PAD, py, photoW, photoH, 8);
                        rctx.clip();
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const slotRatio = photoW / photoH;
                        let sw = vw, sh = vh, sx = 0, sy = 0;
                        if (vw / vh > slotRatio) {
                            sw = vh * slotRatio; sx = (vw - sw) / 2;
                        } else {
                            sh = vw / slotRatio; sy = (vh - sh) / 2;
                        }
                        rctx.drawImage(v, sx, sy, sw, sh, PAD, py, photoW, photoH);
                        rctx.restore();
                    }

                    rctx.strokeStyle = '#6C4AB6';
                    rctx.lineWidth = 2.5;
                    drawRoundedRect(rctx, PAD, py, photoW, photoH, 8);
                    rctx.stroke();

                    drawSparkleStar(rctx, PAD + 8, py + 8, 10, '#E5D4FF');
                    drawSparkleStar(rctx, PAD + photoW - 8, py + photoH - 8, 10, '#E5D4FF');
                });

                rctx.fillStyle = '#E5D4FF';
                rctx.textAlign = 'center';
                rctx.font = '800 24px Archivo, sans-serif';
                rctx.fillText('// TECH IS · CYBER VAULT //', W / 2, 46);
                rctx.font = '700 10px "Space Mono", monospace';
                rctx.fillText('✦ TECH IS DIGITAL STAR STREAM · 2026 ✦', W / 2, 66);

                const fy = H - footerH;
                rctx.fillText('★ TECH IS · 2026 VAPOR EDITION ★', W / 2, fy + 40);

            } else if (styleType === 'washi_tape') {
                const tapeColors = ['rgba(255, 179, 186, 0.85)', 'rgba(186, 225, 255, 0.85)', 'rgba(255, 255, 186, 0.85)', 'rgba(186, 255, 201, 0.85)'];
                vEls.forEach((v, i) => {
                    const py = headerH + i * (photoH + GAP);
                    if (v && v.readyState >= 2) {
                        rctx.save();
                        drawRoundedRect(rctx, PAD, py, photoW, photoH, 4);
                        rctx.clip();
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const slotRatio = photoW / photoH;
                        let sw = vw, sh = vh, sx = 0, sy = 0;
                        if (vw / vh > slotRatio) {
                            sw = vh * slotRatio; sx = (vw - sw) / 2;
                        } else {
                            sh = vw / slotRatio; sy = (vh - sh) / 2;
                        }
                        rctx.drawImage(v, sx, sy, sw, sh, PAD, py, photoW, photoH);
                        rctx.restore();
                    }

                    rctx.strokeStyle = '#E0DDD5';
                    rctx.lineWidth = 2;
                    drawRoundedRect(rctx, PAD, py, photoW, photoH, 4);
                    rctx.stroke();

                    drawWashiTape(rctx, PAD + 18, py + 2, 38, 14, -18, tapeColors[i % tapeColors.length]);
                    drawWashiTape(rctx, PAD + photoW - 18, py + photoH - 2, 38, 14, -18, tapeColors[(i + 1) % tapeColors.length]);
                });

                rctx.fillStyle = '#2E4057';
                rctx.textAlign = 'center';
                rctx.font = '800 20px Archivo, sans-serif';
                rctx.fillText('TECH IS · LIFE FOUR CUTS', W / 2, 46);
                rctx.font = '700 10px "Space Mono", monospace';
                rctx.fillText('TECH IS · SEOUL STUDIO MEMORIES · 2026', W / 2, 66);

                const fy = H - footerH;
                rctx.fillText('TECH IS · LIFE FOUR CUTS · 2026', W / 2, fy + 40);

            } else {
                // Classic Frame
                vEls.forEach((v, i) => {
                    let px = PAD;
                    let py = headerH + i * (photoH + GAP);

                    if (isGrid) {
                        const col = i % 2;
                        const row = Math.floor(i / 2);
                        px = PAD + col * (photoW + GAP);
                        py = headerH + row * (photoH + GAP);
                    }

                    if (v && v.readyState >= 2) {
                        rctx.save();
                        drawRoundedRect(rctx, px, py, photoW, photoH, 6);
                        rctx.clip();
                        rctx.filter = FILTER_CSS[selectedFilter] || 'none';
                        const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
                        const slotRatio = photoW / photoH;
                        let sw = vw, sh = vh, sx = 0, sy = 0;
                        if (vw / vh > slotRatio) {
                            sw = vh * slotRatio; sx = (vw - sw) / 2;
                        } else {
                            sh = vw / slotRatio; sy = (vh - sh) / 2;
                        }
                        rctx.drawImage(v, sx, sy, sw, sh, px, py, photoW, photoH);
                        rctx.restore();
                    }

                    rctx.strokeStyle = theme.line;
                    rctx.lineWidth = 2;
                    drawRoundedRect(rctx, px, py, photoW, photoH, 6);
                    rctx.stroke();

                    rctx.fillStyle = theme.bg;
                    rctx.fillRect(px, py, 28, 16);
                    rctx.fillStyle = theme.textColor;
                    rctx.textAlign = 'left';
                    rctx.font = '700 9px "Space Mono", monospace';
                    rctx.fillText('0' + (i + 1), px + 5, py + 12);
                });

                const fy = H - footerH;
                rctx.strokeStyle = theme.line;
                rctx.lineWidth = 1.5;
                rctx.beginPath();
                rctx.moveTo(PAD, fy);
                rctx.lineTo(W - PAD, fy);
                rctx.stroke();

                rctx.fillStyle = theme.textColor;
                rctx.textAlign = 'center';
                rctx.font = '800 16px Archivo, sans-serif';
                wrapCenterText(rctx, theme.title || 'TECH IS EXHIBIT SOUVENIR', W / 2, fy + 26, W - PAD * 2, 20);
                rctx.font = '700 10px "Space Mono", monospace';
                rctx.globalAlpha = 0.75;
                rctx.fillText(theme.sub || 'MOMENTS IN FOCUS · 2026', W / 2, fy + 56);
                rctx.globalAlpha = 1;
            }

            // Render user-placed stickers & decals over the video reel
            renderStickers(rctx, stickers, W, H);

            if (Date.now() < endTime) {
                setTimeout(drawFrame, 100);
            } else {
                resolve();
            }
        }

        drawFrame();
    });

    return new Promise(resolve => {
        recorder.onstop = () => {
            vEls.forEach(v => { if (v) { v.pause(); URL.revokeObjectURL(v.src); } });
            resolve(new Blob(chunks, { type: mimeType }));
        };
        recorder.stop();
    });
}
