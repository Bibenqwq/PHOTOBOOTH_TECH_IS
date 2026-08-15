import React, { useRef, useState, useEffect } from 'react';

export default function Step1Capture({
    shots,
    setShots,
    videoClips,
    setVideoClips,
    selectedFilter,
    photoCount = 4,
    onBack,
    onProceed,
}) {
    const videoRef = useRef(null);
    const freezeCanvasRef = useRef(null);
    const streamRef = useRef(null);

    const [isLive, setIsLive] = useState(false);
    const [busy, setBusy] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [shotBadge, setShotBadge] = useState(null);
    const [flashing, setFlashing] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    // Stop camera stream when component unmounts
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(t => t.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        if (busy) return;
        try {
            setErrorMsg(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: false,
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsLive(true);
        } catch (err) {
            console.error('Camera error:', err);
            setErrorMsg('Unable to access camera. Please allow camera permissions in your browser.');
        }
    };

    const grabFrame = () => {
        const video = videoRef.current;
        if (!video) return null;

        const vw = video.videoWidth || 1280;
        const vh = video.videoHeight || 720;
        const targetRatio = 16 / 9;
        let sw = vw, sh = vh, sx = 0, sy = 0;
        if (vw / vh > targetRatio) {
            sw = vh * targetRatio; sx = (vw - sw) / 2;
        } else {
            sh = vw / targetRatio; sy = (vh - sh) / 2;
        }

        const c = document.createElement('canvas');
        c.width = 960; c.height = 540;
        const ctx = c.getContext('2d');
        ctx.translate(c.width, 0); ctx.scale(-1, 1);
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, c.width, c.height);

        // Flash freeze frame
        if (freezeCanvasRef.current) {
            const fc = freezeCanvasRef.current;
            fc.width = c.width;
            fc.height = c.height;
            fc.getContext('2d').drawImage(c, 0, 0);
            fc.style.display = 'block';
            setTimeout(() => {
                if (fc) fc.style.display = 'none';
            }, 700);
        }

        return c.toDataURL('image/jpeg', 0.95);
    };

    const startRecordingClip = () => {
        const video = videoRef.current;
        const vw = video.videoWidth || 1280, vh = video.videoHeight || 720;
        const targetRatio = 16 / 9;
        let sw = vw, sh = vh, sx = 0, sy = 0;
        if (vw / vh > targetRatio) { sw = vh * targetRatio; sx = (vw - sw) / 2; }
        else { sh = vw / targetRatio; sy = (vh - sh) / 2; }

        const rc = document.createElement('canvas');
        rc.width = 960; rc.height = 540;
        const rctx = rc.getContext('2d');

        const mimeTypes = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
        const mimeType = mimeTypes.find(t => {
            try { return MediaRecorder.isTypeSupported(t); } catch { return false; }
        }) || 'video/webm';

        const canvasStream = rc.captureStream(15);
        const recorder = new MediaRecorder(canvasStream, { mimeType, videoBitsPerSecond: 2500000 });
        const chunks = [];
        recorder.ondataavailable = e => { if (e.data && e.data.size > 0) chunks.push(e.data); };
        recorder.start(100);

        let isRecording = true;
        function draw() {
            if (!isRecording) return;
            rctx.save();
            rctx.translate(rc.width, 0);
            rctx.scale(-1, 1);
            rctx.drawImage(video, sx, sy, sw, sh, 0, 0, rc.width, rc.height);
            rctx.restore();
            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);

        return {
            stop: () => new Promise(resolve => {
                isRecording = false;
                recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }));
                recorder.stop();
            })
        };
    };

    const triggerFlash = () => {
        setFlashing(true);
        setTimeout(() => setFlashing(false), 350);
    };

    const handleCaptureSequence = async () => {
        if (!isLive || busy) return;
        setBusy(true);
        const newShots = [];
        const newClips = [];
        setShots([]);
        setVideoClips([]);

        const total = photoCount || 4;

        for (let i = 0; i < total; i++) {
            if (i > 0) {
                setShotBadge({ text: `PREPARING SHOT ${i + 1}/${total}`, bg: 'var(--amber)' });
                setCountdown(`GET READY · SHOT ${i + 1}/${total}`);
                await new Promise(r => setTimeout(r, 1300));
            }

            setShotBadge({ text: `REC (${i + 1}/${total})`, bg: '#b3413c', isRec: true });
            const activeRecorder = startRecordingClip();

            for (let n = 3; n >= 1; n--) {
                setCountdown(n);
                await new Promise(r => setTimeout(r, 850));
            }
            setCountdown(null);

            triggerFlash();
            const frame = grabFrame();
            if (frame) newShots.push(frame);
            setShots([...newShots]);

            await new Promise(r => setTimeout(r, 250));
            const clipBlob = await activeRecorder.stop();
            if (clipBlob) newClips.push(clipBlob);
            setVideoClips([...newClips]);
        }

        setShotBadge(null);
        setBusy(false);
    };

    const handleReset = () => {
        if (busy) return;
        setShots([]);
        setVideoClips([]);
        setShotBadge(null);
        setCountdown(null);
    };

    const hasAllShots = shots.length >= photoCount;

    return (
        <section className="panel step1-container">
            <div className="step-title-row">
                <div className="step-title">Step 2 — Capture {photoCount} Photos</div>
                <div className={`cam-head-status ${isLive ? 'live' : ''}`}>
                    {isLive ? 'LIVE' : 'NOT CONNECTED'}
                </div>
            </div>

            <div className="viewfinder">
                <video ref={videoRef} autoPlay playsInline muted style={{ display: isLive ? 'block' : 'none' }} />
                <canvas ref={freezeCanvasRef} className="freeze" style={{ display: 'none' }} />

                {!isLive && (
                    <div className="placeholder">
                        <span>{errorMsg || 'Click “Start Camera” to begin your session'}</span>
                    </div>
                )}

                {shotBadge && (
                    <div className="shot-badge" style={{ background: shotBadge.bg }}>
                        {shotBadge.isRec && (
                            <svg viewBox="0 0 24 24" width="9" height="9" fill="#ffffff">
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        )}
                        {shotBadge.text}
                    </div>
                )}

                {countdown !== null && (
                    <div className="countdown" style={{ fontSize: typeof countdown === 'string' ? '28px' : '110px' }}>
                        {countdown}
                    </div>
                )}

                {flashing && <div className="flash-overlay" />}
            </div>

            <div className="thumbs">
                {Array.from({ length: photoCount }).map((_, idx) => (
                    <div className="t" key={idx}>
                        {shots[idx] ? (
                            <img src={shots[idx]} alt={`Shot ${idx + 1}`} />
                        ) : (
                            <span style={{ fontSize: '11px', opacity: 0.4, fontWeight: 700 }}>0{idx + 1}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="step1-controls">
                <button className="ghost" onClick={onBack} disabled={busy}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back to Layout
                </button>

                {!isLive ? (
                    <button onClick={startCamera}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                            <circle cx="12" cy="13" r="4" />
                        </svg>
                        Start Camera
                    </button>
                ) : (
                    <button disabled>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Camera Connected
                    </button>
                )}

                <button
                    onClick={handleCaptureSequence}
                    disabled={!isLive || busy || hasAllShots}
                >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="4" fill="currentColor" />
                    </svg>
                    {busy ? 'Taking Photos…' : `Capture ${photoCount} Photos (Auto)`}
                </button>

                {hasAllShots && (
                    <>
                        <button className="ghost" onClick={handleReset} disabled={busy}>
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10" />
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                            </svg>
                            Retake
                        </button>

                        <button className="highlight" onClick={onProceed} disabled={busy}>
                            Next: Choose Design
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </section>
    );
}
