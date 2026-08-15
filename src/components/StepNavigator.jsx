import React from 'react';

export default function StepNavigator({ currentStep, photoCount = 4 }) {
    const steps = [
        { num: '01', label: 'Choose Layout' },
        { num: '02', label: `Take ${photoCount} Photos` },
        { num: '03', label: 'Customize Design' },
        { num: '04', label: 'Scan & Download' },
    ];

    return (
        <nav className="steps-nav">
            {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isCurrent = currentStep === stepNum;
                const isDone = currentStep > stepNum;
                const cls = `step-item ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}`;

                return (
                    <React.Fragment key={step.num}>
                        <div className={cls}>
                            <span className="step-num">{step.num}</span>
                            <span className="step-name">{step.label}</span>
                        </div>
                        {idx < steps.length - 1 && (
                            <span className="step-arrow">
                                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </span>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
