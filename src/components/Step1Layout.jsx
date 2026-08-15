import React from 'react';
import { LAYOUTS } from '../utils/canvasRenderer';

export default function Step1Layout({
    selectedLayout,
    setSelectedLayout,
    onProceed,
}) {
    return (
        <section className="panel step-layout-selector">
            <div className="step-title-row">
                <div>
                    <div className="step-title">Step 1 — Choose Photo Layout</div>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--forest-2, #40584c)' }}>
                        Select how many photos you want to capture in your session.
                    </p>
                </div>
            </div>

            <div className="layout-cards-grid">
                {LAYOUTS.map((item) => {
                    const isSelected = selectedLayout === item.id;
                    return (
                        <div
                            key={item.id}
                            className={`layout-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setSelectedLayout(item.id)}
                        >
                            <div className="layout-badge">
                                <span>{item.sub}</span>
                            </div>

                            {/* Mini visual strip wireframe */}
                            <div className="layout-wireframe">
                                <div className="wireframe-header" />
                                <div className={`wireframe-slots ${item.type === 'grid' ? 'grid-mode' : 'vertical-mode'}`}>
                                    {Array.from({ length: item.count }).map((_, idx) => (
                                        <div key={idx} className="wireframe-slot">
                                            <span>0{idx + 1}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="wireframe-footer" />
                            </div>

                            <div className="layout-info">
                                <div className="layout-name">{item.label}</div>
                                <div className="layout-desc">{item.desc}</div>
                            </div>

                            <button
                                type="button"
                                className={`layout-select-btn ${isSelected ? 'active' : ''}`}
                                tabIndex={-1}
                            >
                                {isSelected ? '✓ Selected' : 'Choose Layout'}
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="step-actions" style={{ justifyContent: 'flex-end', marginTop: '24px' }}>
                <button className="highlight" onClick={onProceed} style={{ minWidth: '180px' }}>
                    Next: Take Photos
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
