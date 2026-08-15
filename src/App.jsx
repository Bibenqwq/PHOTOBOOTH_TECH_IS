import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StepNavigator from './components/StepNavigator';
import Step1Layout from './components/Step1Layout';
import Step1Capture from './components/Step1Capture';
import Step2Customize from './components/Step2Customize';
import Step3Download from './components/Step3Download';
import DownloadView from './components/DownloadView';
import { LAYOUTS } from './utils/canvasRenderer';

export default function App() {
    const [step, setStep] = useState(1);
    const [selectedLayout, setSelectedLayout] = useState('4-cut');
    const [shots, setShots] = useState([]);
    const [videoClips, setVideoClips] = useState([]);
    const [selectedFrame, setSelectedFrame] = useState('klique_scallop');
    const [selectedFilter, setSelectedFilter] = useState('normal');
    const [stickers, setStickers] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [logoImg, setLogoImg] = useState(null);

    const currentLayoutObj = LAYOUTS.find(l => l.id === selectedLayout) || LAYOUTS[2];
    const photoCount = currentLayoutObj.count;

    // Preload brand logo
    useEffect(() => {
        const img = new Image();
        img.src = '/logo.png';
        img.onload = () => setLogoImg(img);
    }, []);

    // Check if visiting a download URL e.g. /d/xyz123 or ?session=xyz123
    const pathname = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const downloadSession = pathname.startsWith('/d/')
        ? pathname.replace('/d/', '').split('/')[0]
        : urlParams.get('session');

    if (downloadSession) {
        return <DownloadView sessionCode={downloadSession} />;
    }

    const handleResetSession = () => {
        setShots([]);
        setVideoClips([]);
        setStickers([]);
        setCurrentSessionId(null);
        setStep(1);
    };

    const handleLayoutChange = (layoutId) => {
        setSelectedLayout(layoutId);
        // Clear previous shots if layout changed
        setShots([]);
        setVideoClips([]);
        setStickers([]);
        if (layoutId === '2-cut') {
            setSelectedFrame('klique_scallop');
        } else if (selectedFrame === 'klique_scallop') {
            setSelectedFrame('kodak_35mm');
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <Header />
            <StepNavigator currentStep={step} photoCount={photoCount} />

            <main className="app-main">
                {step === 1 && (
                    <Step1Layout
                        selectedLayout={selectedLayout}
                        setSelectedLayout={handleLayoutChange}
                        onProceed={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <Step1Capture
                        shots={shots}
                        setShots={setShots}
                        videoClips={videoClips}
                        setVideoClips={setVideoClips}
                        selectedFilter={selectedFilter}
                        photoCount={photoCount}
                        selectedLayout={selectedLayout}
                        onBack={() => setStep(1)}
                        onProceed={() => setStep(3)}
                    />
                )}

                {step === 3 && (
                    <Step2Customize
                        shots={shots}
                        selectedLayout={selectedLayout}
                        selectedFrame={selectedFrame}
                        setSelectedFrame={setSelectedFrame}
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        stickers={stickers}
                        setStickers={setStickers}
                        logoImg={logoImg}
                        onBack={() => setStep(2)}
                        onProceed={() => setStep(4)}
                    />
                )}

                {step === 4 && (
                    <Step3Download
                        shots={shots}
                        videoClips={videoClips}
                        selectedLayout={selectedLayout}
                        selectedFrame={selectedFrame}
                        selectedFilter={selectedFilter}
                        stickers={stickers}
                        logoImg={logoImg}
                        currentSessionId={currentSessionId}
                        setCurrentSessionId={setCurrentSessionId}
                        onBack={() => setStep(3)}
                        onReset={handleResetSession}
                    />
                )}
            </main>

            <footer className="app-footer">
                <span>TECH IS · OFFICIAL PHOTO BOOTH</span>
                <span>REACT PHOTO BOOTH v2.5 · 4-STEP EDITION</span>
            </footer>
        </div>
    );
}
