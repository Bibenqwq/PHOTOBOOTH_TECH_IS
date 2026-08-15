import React, { useEffect, useState } from 'react';
import { fetchSessionRecord, SUPABASE_URL, BUCKET_NAME } from '../utils/supabase';

export default function DownloadView({ sessionCode }) {
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloadingPhoto, setDownloadingPhoto] = useState(false);
    const [downloadingVideo, setDownloadingVideo] = useState(false);
    const [photoStatus, setPhotoStatus] = useState('');
    const [videoStatus, setVideoStatus] = useState('');

    useEffect(() => {
        const load = async () => {
            if (!sessionCode) return;
            const data = await fetchSessionRecord(sessionCode);
            setSessionData(data);
            setLoading(false);
        };
        load();
    }, [sessionCode]);

    const frameTheme = sessionData?.frame_theme || sessionData?.meta?.frame_template || 'klique_scallop';
    const fallbackPhotoData = sessionData?.meta?.photo_data;
    const initialPhotoUrl = sessionData?.photo_url || `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${sessionCode}/techis-photostrip-${frameTheme}.png`;
    const [displayPhotoUrl, setDisplayPhotoUrl] = useState(fallbackPhotoData || initialPhotoUrl);
    const videoUrl = sessionData?.video_url || `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${sessionCode}/techis-reel-${frameTheme}.mp4`;

    // Local endpoint fallbacks
    const localPhotoUrl = `/upload?session=${sessionCode}&filename=techis-photostrip-${frameTheme}.png`;
    const localVideoUrl = `/upload?session=${sessionCode}&filename=techis-reel-${frameTheme}.mp4`;

    useEffect(() => {
        if (sessionData?.meta?.photo_data) {
            setDisplayPhotoUrl(sessionData.meta.photo_data);
        } else if (sessionData?.photo_url) {
            setDisplayPhotoUrl(sessionData.photo_url);
        }
    }, [sessionData]);

    /**
     * Forces direct automatic file download on mobile and desktop
     */
    const handleDownload = async (type) => {
        const isPhoto = type === 'photo';
        if (isPhoto) {
            setDownloadingPhoto(true);
            setPhotoStatus('Downloading Photo Strip…');
        } else {
            setDownloadingVideo(true);
            setVideoStatus('Downloading Video Reel…');
        }

        const filename = isPhoto
            ? `TechIS-PhotoStrip-${sessionCode.slice(0, 8)}.png`
            : `TechIS-Reel-${sessionCode.slice(0, 8)}.mp4`;

        const primaryUrl = isPhoto ? (displayPhotoUrl || localPhotoUrl) : (videoUrl || localVideoUrl);
        const secondaryUrl = isPhoto ? localPhotoUrl : localVideoUrl;

        try {
            // If already data URL or blob
            if (primaryUrl.startsWith('data:') || primaryUrl.startsWith('blob:')) {
                const a = document.createElement('a');
                a.href = primaryUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                if (isPhoto) setPhotoStatus('✅ Saved to device!');
                else setVideoStatus('✅ Saved to device!');
                return;
            }

            // Attempt to fetch blob from primary or fallback URL
            let res = null;
            try {
                res = await fetch(primaryUrl);
            } catch (e) {
                console.warn('Primary fetch failed, trying local fallback…', e);
            }

            if (!res || !res.ok) {
                try {
                    res = await fetch(secondaryUrl);
                } catch (e) {}
            }

            if (res && res.ok) {
                const blob = await res.blob();
                const blobUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => window.URL.revokeObjectURL(blobUrl), 4000);

                if (isPhoto) setPhotoStatus('✅ Photo Strip Downloaded!');
                else setVideoStatus('✅ Video Reel Downloaded!');
            } else {
                throw new Error('Blob fetch unavailable');
            }
        } catch (err) {
            console.warn('Falling back to direct anchor trigger:', err);
            // Fallback direct anchor click
            const a = document.createElement('a');
            a.href = primaryUrl;
            a.download = filename;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            if (isPhoto) setPhotoStatus('✅ Download triggered!');
            else setVideoStatus('✅ Download triggered!');
        } finally {
            if (isPhoto) {
                setTimeout(() => { setDownloadingPhoto(false); setPhotoStatus(''); }, 3500);
            } else {
                setTimeout(() => { setDownloadingVideo(false); setVideoStatus(''); }, 3500);
            }
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <header className="app-header" style={{ marginBottom: '4px' }}>
                <div className="eyemark">
                    <img src="/logo.png" alt="Tech IS" className="brand-logo" />
                    <div className="brand-text">
                        <span className="num">PHOTO BOOTH</span>
                        <span className="name">Tech IS</span>
                    </div>
                </div>
                <div className="tag">
                    {sessionCode.slice(0, 8).toUpperCase()}
                </div>
            </header>

            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'center', padding: '24px 20px' }}>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 6px' }}>
                        Your Souvenirs are Ready!
                    </h1>
                    <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'var(--forest-2)', margin: 0 }}>
                        Tap the buttons below to automatically download your official Photo Strip and 15s Video Reel.
                    </p>
                </div>

                {/* Photo Strip Image Preview */}
                {displayPhotoUrl && (
                    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1.5px solid var(--line)', background: '#f7f6f2' }}>
                        <img
                            src={displayPhotoUrl}
                            alt="Photo Strip"
                            onError={() => {
                                if (fallbackPhotoData && displayPhotoUrl !== fallbackPhotoData) {
                                    setDisplayPhotoUrl(fallbackPhotoData);
                                } else if (displayPhotoUrl !== localPhotoUrl) {
                                    setDisplayPhotoUrl(localPhotoUrl);
                                }
                            }}
                            style={{ width: '100%', maxHeight: '460px', objectFit: 'contain', display: 'block' }}
                        />
                    </div>
                )}

                {/* Video Reel Preview Player */}
                <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1.5px solid var(--line)', background: '#141414' }}>
                    <video
                        src={videoUrl}
                        onError={(e) => {
                            if (e.target.src !== localVideoUrl) {
                                e.target.src = localVideoUrl;
                            }
                        }}
                        controls
                        playsInline
                        muted
                        autoPlay
                        loop
                        style={{ width: '100%', maxHeight: '280px', display: 'block', objectFit: 'contain' }}
                    />
                </div>

                {/* Automatic Direct Download Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* 1. Download Photo Strip */}
                    <button
                        type="button"
                        className="highlight"
                        onClick={() => handleDownload('photo')}
                        disabled={downloadingPhoto}
                        style={{ width: '100%', padding: '15px', fontSize: '14px', fontWeight: 800 }}
                    >
                        {downloadingPhoto ? (
                            <span>{photoStatus || 'Downloading…'}</span>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                {photoStatus || 'Download Photo Strip (.PNG)'}
                            </>
                        )}
                    </button>

                    {/* 2. Download Video Reel */}
                    <button
                        type="button"
                        className="ghost"
                        onClick={() => handleDownload('video')}
                        disabled={downloadingVideo}
                        style={{ width: '100%', padding: '15px', fontSize: '14px', fontWeight: 800 }}
                    >
                        {downloadingVideo ? (
                            <span>{videoStatus || 'Downloading…'}</span>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="23 7 16 12 23 17 23 7" />
                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                </svg>
                                {videoStatus || 'Download 15s Video Reel (.MP4)'}
                            </>
                        )}
                    </button>
                </div>
            </div>

            <footer className="app-footer" style={{ justifyContent: 'center', textAlign: 'center' }}>
                <span>TECH IS · OFFICIAL SOUVENIR STATION · 2026</span>
            </footer>
        </div>
    );
}
