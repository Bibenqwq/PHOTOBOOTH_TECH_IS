import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { renderPhotoStrip } from '../utils/canvasRenderer';
import { buildVideoReel } from '../utils/videoReelBuilder';
import { uploadSessionFile } from '../utils/supabase';

export default function Step3Download({
    shots,
    videoClips,
    selectedLayout = '4-cut',
    selectedFrame,
    selectedFilter,
    stickers = [],
    logoImg,
    currentSessionId,
    setCurrentSessionId,
    onBack,
    onReset,
}) {
    const canvasRef = useRef(null);
    const qrCanvasRef = useRef(null);

    const [progressPct, setProgressPct] = useState(15);
    const [progressText, setProgressText] = useState('Generating your photo strip…');
    const [isReady, setIsReady] = useState(false);
    const [downloadLink, setDownloadLink] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        let isCancelled = false;

        const processAndUpload = async () => {
            try {
                // 1. Session ID
                const session = currentSessionId || Math.random().toString(36).substring(2, 10);
                setCurrentSessionId(session);

                // 2. Fetch local server info for Cloudflare tunnel URL or Local Network IP
                let cloudflareTunnelUrl = null;
                let localNetworkUrl = null;
                try {
                    const infoRes = await fetch('/info');
                    if (infoRes.ok) {
                        const info = await infoRes.json();
                        cloudflareTunnelUrl = info.publicUrl;
                        localNetworkUrl = info.localUrl;
                    }
                } catch (e) {}

                // 3. Render and upload Photo Strip PNG
                setProgressPct(25);
                setProgressText('Rendering high-res photo strip…');
                
                if (canvasRef.current && shots && shots.length > 0) {
                    await renderPhotoStrip(canvasRef.current, shots, selectedFrame, selectedFilter, logoImg, selectedLayout, stickers);
                }

                if (isCancelled) return;

                const pngBlob = await new Promise(res => {
                    if (canvasRef.current) canvasRef.current.toBlob(res, 'image/png');
                    else res(null);
                });

                setProgressPct(45);
                setProgressText('Saving photo strip (1/2)…');

                if (pngBlob) {
                    // Upload to local server (for Cloudflare tunnel)
                    try {
                        await fetch(`/upload?session=${session}&filename=techis-photostrip-${selectedFrame}.png&frame=${selectedFrame}&filter=${selectedFilter}`, {
                            method: 'POST',
                            body: pngBlob,
                        });
                    } catch (e) {}

                    // Also sync to Supabase Cloud
                    const photoRes = await uploadSessionFile(
                        session,
                        pngBlob,
                        `techis-photostrip-${selectedFrame}.png`,
                        { frame: selectedFrame, filter: selectedFilter, layout: selectedLayout }
                    );
                    if (photoRes.publicUrl) setPhotoUrl(photoRes.publicUrl);
                }

                if (isCancelled) return;

                // 4. Build and upload 15s 10fps Video Reel
                setProgressPct(65);
                setProgressText('Compiling 15s video reel (.MP4)…');

                const reelBlob = await buildVideoReel(videoClips, selectedFrame, selectedFilter, logoImg, selectedLayout, stickers);

                if (isCancelled) return;

                setProgressPct(85);
                setProgressText('Saving video reel (2/2)…');

                if (reelBlob) {
                    // Upload to local server (for Cloudflare tunnel)
                    try {
                        await fetch(`/upload?session=${session}&filename=techis-reel-${selectedFrame}.mp4&frame=${selectedFrame}&filter=${selectedFilter}`, {
                            method: 'POST',
                            body: reelBlob,
                        });
                    } catch (e) {}

                    // Also sync to Supabase Cloud
                    const videoRes = await uploadSessionFile(
                        session,
                        reelBlob,
                        `techis-reel-${selectedFrame}.mp4`,
                        { frame: selectedFrame, filter: selectedFilter, layout: selectedLayout }
                    );
                    if (videoRes.publicUrl) setVideoUrl(videoRes.publicUrl);
                }

                if (isCancelled) return;

                // 5. Generate QR Code linking to download page
                setProgressPct(100);
                setProgressText('Ready to download!');

                const envPublicUrl = import.meta.env.VITE_PUBLIC_URL;
                let baseUrl = envPublicUrl || cloudflareTunnelUrl;

                if (!baseUrl) {
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        baseUrl = localNetworkUrl || window.location.origin;
                    } else {
                        baseUrl = window.location.origin;
                    }
                }

                const mobilePageUrl = `${baseUrl.replace(/\/+$/, '')}/d/${session}`;
                setDownloadLink(mobilePageUrl);

                if (qrCanvasRef.current) {
                    await QRCode.toCanvas(qrCanvasRef.current, mobilePageUrl, {
                        width: 164,
                        margin: 1,
                        color: {
                            dark: '#132A22',
                            light: '#FFFFFF',
                        },
                    });
                }

                setIsReady(true);
            } catch (err) {
                console.error('Download preparation error:', err);
                setProgressText('Completed! Scan QR to download.');
                setIsReady(true);
            }
        };

        processAndUpload();

        return () => {
            isCancelled = true;
        };
    }, [shots, videoClips, selectedLayout, selectedFrame, selectedFilter, logoImg]);

    return (
        <section className="panel step3-layout">
            <div className="preview-pane">
                <div className="side-subhead" style={{ marginTop: 0 }}>YOUR PHOTO STRIP</div>
                <canvas
                    ref={canvasRef}
                    className="final-canvas"
                    style={{ maxWidth: '380px' }}
                />
            </div>

            <div className="download-card">
                <div className="step-title">Step 4 — Scan to Download</div>
                <p className="qr-scan-hint">
                    Scan with your phone camera to download your <strong>Photo Strip</strong> and <strong>15s Video Reel</strong>.
                </p>

                <div className="qr-box">
                    <canvas ref={qrCanvasRef} style={{ display: isReady ? 'block' : 'none' }} />
                    {!isReady && (
                        <div className="qr-svg-spin">
                            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="9" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="qr-progress">
                    <div className="qr-bar-track">
                        <div className="qr-bar-fill" style={{ width: `${progressPct}%` }} />
                    </div>
                    <div className="qr-status-row">
                        {!isReady ? (
                            <svg className="qr-svg-spin" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="9" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        )}
                        <span>{progressText}</span>
                    </div>
                </div>

                {isReady && downloadLink && (
                    <div style={{ fontSize: '11px', fontFamily: 'Space Mono, monospace', wordBreak: 'break-all', marginTop: '4px', opacity: 0.85 }}>
                        <a href={downloadLink} target="_blank" rel="noreferrer" style={{ color: 'var(--pine-1, #1b4332)', textDecoration: 'underline' }}>
                            {downloadLink}
                        </a>
                    </div>
                )}

                <div className="step-actions" style={{ marginTop: '10px' }}>
                    <button className="ghost" onClick={onBack}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Change Design
                    </button>
                    <button className="highlight" onClick={onReset}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 4 23 10 17 10" />
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                        Start New Session
                    </button>
                </div>
            </div>
        </section>
    );
}
