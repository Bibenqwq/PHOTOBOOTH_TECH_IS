import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { renderPhotoStrip, STICKER_PACKS, THEME } from '../utils/canvasRenderer';

export const FILTERS = [
    { id: 'normal', label: 'Natural', icon: '✨' },
    { id: 'vintage', label: 'Warm Vintage', icon: '🎞️' },
    { id: 'bw', label: 'B&W Noir', icon: '🖤' },
    { id: 'warm', label: 'Golden Hour', icon: '☀️' },
    { id: 'cool', label: 'Cyber Mist', icon: '❄️' },
    { id: 'film', label: '90s Indie Film', icon: '📷' },
];

export const FRAMES = [
    // 🧠 VIRAL BRAINROT & GEN-Z MEME SERIES (7 VIRAL DESIGNS)
    {
        id: 'brainrot_mewing_sigma',
        label: 'Sigma Mewing & Mog',
        sub: 'Bye Bye 🤫🧏‍♂️ · Jawline Rizz',
        tag: '🤫 SIGMA MEWING',
        pattern: 'brainrot_sigma_mockup',
        cardBg: '#121214',
        accent: '#00E5FF',
    },
    {
        id: 'brainrot_skibidi_toilet',
        label: 'Skibidi Rizz Dop Dop',
        sub: 'Dop Dop Yes Yes · Y2K Glitch',
        tag: '🚽 SKIBIDI RIZZ',
        pattern: 'brainrot_skibidi_mockup',
        cardBg: '#0B0A12',
        accent: '#00F0FF',
    },
    {
        id: 'brainrot_chill_guy',
        label: 'Just A Chill Guy',
        sub: 'Low Stress · Unbothered King',
        tag: '🧢 CHILL GUY',
        pattern: 'brainrot_chill_mockup',
        cardBg: '#F6EFE6',
        accent: '#8C6239',
    },
    {
        id: 'brainrot_rizzler',
        label: 'Unspoken W Rizz',
        sub: 'The Ultimate Rizzler · 🍷',
        tag: '🍷 W RIZZ ONLY',
        pattern: 'brainrot_rizzler_mockup',
        cardBg: '#4A050B',
        accent: '#FFE6A7',
    },
    {
        id: 'brainrot_grimace_shake',
        label: 'Gyatt & Grimace Shake',
        sub: 'Purple Chaos · Level 100 Gyatt',
        tag: '👾 LEVEL 100 GYATT',
        pattern: 'brainrot_grimace_mockup',
        cardBg: '#240046',
        accent: '#E0AAFF',
    },
    {
        id: 'brainrot_capybara',
        label: 'Ok I Pull Up Capybara',
        sub: 'Coconut Doggy · Sunset Chill 🍊',
        tag: '🦫 OK I PULL UP',
        pattern: 'brainrot_capybara_mockup',
        cardBg: '#FFF1E6',
        accent: '#F77F00',
    },
    {
        id: 'brainrot_subo_tung',
        label: 'Tung Tung & Aura Master',
        sub: 'What Da Hell · 1,000,000 Aura',
        tag: '💥 1M AURA TUNG',
        pattern: 'brainrot_tung_mockup',
        cardBg: '#0A0A0A',
        accent: '#CCFF00',
    },
    // 🌿 3 CLIMATE ACTION & PASTEL SERIES
    {
        id: 'climate_sage_earth',
        label: 'Think Green Sage',
        sub: 'Template 01 · Forest Green & Earth',
        tag: '🌍 CLIMATE ACTION T1',
        pattern: 'climate_t1_mockup',
        cardBg: '#E2EBE0',
        accent: '#1B4332',
    },
    {
        id: 'climate_bear_matcha',
        label: 'Matcha Bear Impact',
        sub: 'Template 02 · Mascot & Cream',
        tag: '🐻 CLIMATE ACTION T2',
        pattern: 'climate_t2_mockup',
        cardBg: '#EBF3E7',
        accent: '#2D5A27',
    },
    {
        id: 'climate_lavender_heal',
        label: 'Lavender Heal Planet',
        sub: 'Template 03 · Lilac Rainbow & Heart',
        tag: '🌈 CLIMATE ACTION T3',
        pattern: 'climate_t3_mockup',
        cardBg: '#EFEAF8',
        accent: '#5E4B8B',
    },
    // 🔥 RED EDITIONS & SPARTAN PRIDE
    {
        id: 'spartan_crimson',
        label: 'Red Spartan Varsity',
        sub: 'Deep Crimson & Gold Trim',
        tag: '🔥 RED SPARTAN PRIDE',
        pattern: 'spartan',
        cardBg: '#7A0C16',
        accent: '#F4B41A',
    },
    {
        id: 'cherry_velvet',
        label: 'Cherry Velvet & Bows',
        sub: 'French Cherry & Pearl Trim',
        tag: '🍒 SWEET CHERRY RED',
        pattern: 'cherry_frame',
        cardBg: '#9E1B32',
        accent: '#FFCCD5',
    },
    {
        id: 'cyber_scarlet',
        label: 'Scarlet Cyber Stars',
        sub: 'Vibrant Scarlet & Gold Stars',
        tag: '🏎️ Y2K RED EDITION',
        pattern: 'scarlet_frame',
        cardBg: '#D90429',
        accent: '#FFD166',
    },
    {
        id: 'klique_scallop',
        label: 'Red Spartan Scallop',
        sub: 'Vintage Striped Lace Oval',
        tag: '🔥 TRENDING VINTAGE',
        pattern: 'scallop',
        cardBg: '#FBF6EB',
        accent: '#681B24',
        allowedLayouts: ['2-cut'], // Exclusive to Duo Strip (2-Cut)
    },
    {
        id: 'coquette_bow',
        label: 'Coquette Ribbons',
        sub: 'Pastel Blush & Satin Bows',
        tag: '🎀 SWEET AESTHETIC',
        pattern: 'bow',
        cardBg: '#FFF0F3',
        accent: '#C9184A',
    },
    {
        id: 'kodak_35mm',
        label: '35mm Filmstrip',
        sub: 'Authentic Sprockets & ISO',
        tag: '🎞️ ANALOG KODAK',
        pattern: 'film',
        cardBg: '#141414',
        accent: '#F4B41A',
    },
    {
        id: 'y2k_cyber',
        label: 'Y2K Cyber Stars',
        sub: 'Chrome Glow & Metallic',
        tag: '⭐ Y2K CHROME',
        pattern: 'y2k',
        cardBg: '#18122B',
        accent: '#E5D4FF',
    },
    {
        id: 'korean_washi',
        label: 'Korean Photomaton',
        sub: 'Pastel Washi Tape & Stamps',
        tag: '🇰🇷 LIFE 4 CUTS',
        pattern: 'washi',
        cardBg: '#F6F4EE',
        accent: '#2E4057',
    },
    {
        id: 'climate',
        label: 'Tech Emerald',
        sub: 'Forest Green & Gold Trim',
        tag: '🌿 OFFICIAL BOOTH',
        pattern: 'emerald',
        cardBg: '#173F30',
        accent: '#F2F0E7',
    },
    {
        id: 'noir',
        label: 'Noir Editorial',
        sub: 'Luxury Monochrome Studio',
        tag: '🖤 HIGH FASHION',
        pattern: 'noir',
        cardBg: '#050505',
        accent: '#FFFFFF',
    },
    {
        id: 'retro_arcade',
        label: 'Retro Neon Pop',
        sub: 'Vaporwave Sunset & Lilac',
        tag: '👾 90s ARCADE',
        pattern: 'arcade',
        cardBg: '#24103A',
        accent: '#FF6B8B',
    },
];

// Helper to render crisp SVG icons for the sticker palette
export function renderStickerSvgIcon(item, size = 32) {
    const color = item.color || '#F4B41A';

    switch (item.type) {
        case 'vector_bow':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 24 C14 12, 10 32, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <path d="M24 24 C34 12, 38 32, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <path d="M22 26 Q16 38, 12 42" stroke={color} strokeWidth="3" strokeLinecap="round" />
                    <path d="M26 26 Q32 38, 36 42" stroke={color} strokeWidth="3" strokeLinecap="round" />
                    <circle cx="24" cy="24" r="5" fill="#FFFFFF" stroke={color} strokeWidth="1.5" />
                </svg>
            );
        case 'vector_heart':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 40 C10 28, 4 16, 12 10 C18 6, 22 10, 24 14 C26 10, 30 6, 36 10 C44 16, 38 28, 24 40 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="16" cy="14" r="3" fill="rgba(255,255,255,0.6)" />
                </svg>
            );
        case 'vector_sparkle_heart':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 40 C10 28, 4 16, 12 10 C18 6, 22 10, 24 14 C26 10, 30 6, 36 10 C44 16, 38 28, 24 40 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <path d="M34 6 Q34 14, 42 14 Q34 14, 34 22 Q34 14, 26 14 Q34 14, 34 6 Z" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_star4':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 4 Q24 24, 44 24 Q24 24, 24 44 Q24 24, 4 24 Q24 24, 24 4 Z" fill={color} />
                    <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_star8':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 4 Q24 24, 44 24 Q24 24, 24 44 Q24 24, 4 24 Q24 24, 24 4 Z" fill={color} />
                    <g transform="rotate(45 24 24)">
                        <path d="M24 10 Q24 24, 38 24 Q24 24, 24 38 Q24 24, 10 24 Q24 24, 24 10 Z" fill={color} opacity="0.85" />
                    </g>
                    <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_butterfly':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 24 C12 8, 4 20, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <path d="M24 24 C36 8, 44 20, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <path d="M24 24 C14 36, 18 42, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <path d="M24 24 C34 36, 30 42, 24 24 Z" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <ellipse cx="24" cy="24" rx="2.5" ry="8" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_flame':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 6 C28 14, 40 20, 36 34 C32 44, 16 44, 12 34 C8 24, 20 18, 24 6 Z" fill={color} stroke="#FFE3A8" strokeWidth="1" />
                    <path d="M24 20 C27 26, 32 30, 29 36 C27 40, 21 40, 19 36 C17 32, 22 28, 24 20 Z" fill="#FFD166" />
                </svg>
            );
        case 'vector_lightning':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M28 4 L14 24 L24 24 L20 44 L34 20 L24 20 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            );
        case 'vector_flower':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="12" r="7" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <circle cx="35" cy="20" r="7" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <circle cx="31" cy="33" r="7" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <circle cx="17" cy="33" r="7" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <circle cx="13" cy="20" r="7" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <circle cx="24" cy="24" r="6" fill={color} />
                </svg>
            );
        case 'vector_cherry':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M16 28 Q24 10, 32 8" stroke="#38B000" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M32 28 Q24 10, 32 8" stroke="#38B000" strokeWidth="2.5" strokeLinecap="round" />
                    <ellipse cx="28" cy="12" rx="5" ry="2.5" transform="rotate(30 28 12)" fill="#70E000" />
                    <circle cx="16" cy="32" r="7.5" fill={color} />
                    <circle cx="32" cy="32" r="7.5" fill={color} />
                    <circle cx="14" cy="29" r="2" fill="#FFFFFF" />
                    <circle cx="30" cy="29" r="2" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_angel_wings':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 24 C16 12, 4 16, 8 28 C12 34, 20 30, 24 24 Z" fill={color} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                    <path d="M24 24 C32 12, 44 16, 40 28 C36 34, 28 30, 24 24 Z" fill={color} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                </svg>
            );
        case 'vector_camera':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="14" width="36" height="26" rx="4" fill={color} />
                    <circle cx="24" cy="27" r="8" fill="#FFFFFF" />
                    <circle cx="24" cy="27" r="5" fill="#141414" />
                    <circle cx="34" cy="20" r="2.5" fill="#F4B41A" />
                </svg>
            );
        case 'vector_kiss_lips':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M6 24 C14 14, 20 18, 24 22 C28 18, 34 14, 42 24 C34 22, 14 22, 6 24 Z" fill={color} />
                    <path d="M6 24 C14 36, 34 36, 42 24 C32 26, 16 26, 6 24 Z" fill={color} />
                    <ellipse cx="24" cy="29" rx="3" ry="1.5" fill="rgba(255,255,255,0.6)" />
                </svg>
            );
        case 'vector_rose':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <ellipse cx="14" cy="34" rx="8" ry="4" transform="rotate(30 14 34)" fill="#38B000" />
                    <ellipse cx="34" cy="34" rx="8" ry="4" transform="rotate(-30 34 34)" fill="#38B000" />
                    <circle cx="24" cy="22" r="14" fill={color} />
                    <circle cx="22" cy="20" r="9" fill="#A01A3D" />
                    <circle cx="24" cy="22" r="5" fill="#FF4D6D" stroke="#FFFFFF" strokeWidth="1" />
                </svg>
            );
        case 'vector_clover':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <circle cx="18" cy="18" r="6" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <circle cx="30" cy="18" r="6" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <circle cx="18" cy="30" r="6" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <circle cx="30" cy="30" r="6" fill={color} stroke="#FFFFFF" strokeWidth="1" />
                    <path d="M24 28 Q28 38, 30 42" stroke={color} strokeWidth="3" strokeLinecap="round" />
                </svg>
            );
        case 'vector_crown':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M8 36 L8 18 L16 26 L24 14 L32 26 L40 18 L40 36 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="24" cy="14" r="2.5" fill="#E63946" />
                    <circle cx="8" cy="18" r="2" fill="#E63946" />
                    <circle cx="40" cy="18" r="2" fill="#E63946" />
                </svg>
            );
        case 'vector_cyber_cross':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M24 4 L28 20 L44 24 L28 28 L24 44 L20 28 L4 24 L20 20 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
                </svg>
            );
        case 'vector_sparkles':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <path d="M22 6 Q22 22, 38 22 Q22 22, 22 38 Q22 22, 6 22 Q22 22, 22 6 Z" fill={color} />
                    <path d="M36 4 Q36 12, 44 12 Q36 12, 36 20 Q36 12, 28 12 Q36 12, 36 4 Z" fill="#FFFFFF" />
                    <path d="M12 28 Q12 34, 18 34 Q12 34, 12 40 Q12 34, 6 34 Q12 34, 12 28 Z" fill={color} />
                </svg>
            );
        case 'vector_music_note':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <ellipse cx="16" cy="34" rx="6" ry="4" transform="rotate(-20 16 34)" fill={color} />
                    <ellipse cx="34" cy="30" rx="6" ry="4" transform="rotate(-20 34 30)" fill={color} />
                    <path d="M20 32 L20 12 L38 8 L38 28" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 12 L38 8" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
            );
        case 'vector_sunglasses':
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="20" width="16" height="12" rx="3" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <rect x="26" y="20" width="16" height="12" rx="3" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="22" y1="24" x2="26" y2="24" stroke="#FFFFFF" strokeWidth="2" />
                    <line x1="8" y1="23" x2="16" y2="29" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                    <line x1="28" y1="23" x2="36" y2="29" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                </svg>
            );
        case 'badge':
            return (
                <span className="mini-badge-btn" style={{ background: item.bgColor, color: item.textColor, borderColor: item.borderColor || '#FFFFFF' }}>
                    {item.content}
                </span>
            );
        default:
            return null;
    }
}

function FrameMockupPreview({ pattern }) {
    switch (pattern) {
        case 'brainrot_sigma_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#121214', borderColor: '#FFD700' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#00E5FF', color: '#000000' }}>MOG</span>
                    <div className="brainrot-slot" style={{ borderColor: '#FFD700' }} />
                    <span className="brainrot-icon-br">🤫</span>
                </div>
            );
        case 'brainrot_skibidi_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#0B0A12', borderColor: '#00F0FF' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#FF0055', color: '#FFFFFF' }}>RIZZ</span>
                    <div className="brainrot-slot" style={{ borderColor: '#00F0FF' }} />
                    <span className="brainrot-icon-br">🚽</span>
                </div>
            );
        case 'brainrot_chill_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#F6EFE6', borderColor: '#6B4E3D' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#8C6239', color: '#FFFFFF' }}>CHILL</span>
                    <div className="brainrot-slot" style={{ borderColor: '#6B4E3D' }} />
                    <span className="brainrot-icon-br">🧢</span>
                </div>
            );
        case 'brainrot_rizzler_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#4A050B', borderColor: '#FFE6A7' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#FF4D6D', color: '#FFFFFF' }}>W</span>
                    <div className="brainrot-slot" style={{ borderColor: '#FFE6A7' }} />
                    <span className="brainrot-icon-br">🍷</span>
                </div>
            );
        case 'brainrot_grimace_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#240046', borderColor: '#C77DFF' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#70E000', color: '#000000' }}>GYATT</span>
                    <div className="brainrot-slot" style={{ borderColor: '#C77DFF' }} />
                    <span className="brainrot-icon-br">👾</span>
                </div>
            );
        case 'brainrot_capybara_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#FFF1E6', borderColor: '#7F4F24' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#F77F00', color: '#FFFFFF' }}>PULL UP</span>
                    <div className="brainrot-slot" style={{ borderColor: '#7F4F24' }} />
                    <span className="brainrot-icon-br">🍊</span>
                </div>
            );
        case 'brainrot_tung_mockup':
            return (
                <div className="mockup-brainrot-frame" style={{ background: '#0A0A0A', borderColor: '#CCFF00' }}>
                    <span className="brainrot-badge-tag" style={{ background: '#FF0033', color: '#FFFFFF' }}>1M</span>
                    <div className="brainrot-slot" style={{ borderColor: '#CCFF00' }} />
                    <span className="brainrot-icon-br">🔥</span>
                </div>
            );
        case 'climate_t1_mockup':
            return (
                <div className="mockup-climate-frame" style={{ background: '#E2EBE0', borderColor: '#1B4332' }}>
                    <span className="climate-badge-num" style={{ background: '#1B4332' }}>1</span>
                    <div className="climate-slot" style={{ borderColor: '#1B4332' }} />
                    <span className="climate-icon-br">🌍</span>
                </div>
            );
        case 'climate_t2_mockup':
            return (
                <div className="mockup-climate-frame" style={{ background: '#EBF3E7', borderColor: '#2D5A27' }}>
                    <span className="climate-badge-num" style={{ background: '#2D5A27' }}>2</span>
                    <div className="climate-slot" style={{ borderColor: '#2D5A27' }} />
                    <span className="climate-icon-br">🐻</span>
                </div>
            );
        case 'climate_t3_mockup':
            return (
                <div className="mockup-climate-frame" style={{ background: '#EFEAF8', borderColor: '#5E4B8B' }}>
                    <span className="climate-badge-num" style={{ background: '#5E4B8B' }}>3</span>
                    <div className="climate-slot" style={{ borderColor: '#5E4B8B' }} />
                    <span className="climate-icon-br">🌈</span>
                </div>
            );
        case 'spartan':
            return (
                <div className="mockup-spartan-frame">
                    <span className="spartan-star-top">✦</span>
                    <div className="spartan-slot" />
                    <span className="spartan-star-bottom">✦</span>
                </div>
            );
        case 'cherry_frame':
            return (
                <div className="mockup-cherry-frame">
                    <span className="cherry-bow-icon">🎀</span>
                    <div className="cherry-slot" />
                    <span className="cherry-duo-icon">🍒</span>
                </div>
            );
        case 'scarlet_frame':
            return (
                <div className="mockup-scarlet-frame">
                    <span className="scarlet-star-tr">★</span>
                    <div className="scarlet-slot" />
                    <span className="scarlet-star-bl">★</span>
                </div>
            );
        case 'scallop':
            return (
                <div className="mockup-scallop-oval">
                    <div className="mockup-scallop-stripes" />
                    <div className="mockup-scallop-inner" />
                </div>
            );
        case 'bow':
            return (
                <div className="mockup-bow-frame">
                    <span className="mockup-bow-icon">🎀</span>
                    <div className="mockup-bow-inner" />
                </div>
            );
        case 'film':
            return (
                <div className="mockup-film-frame">
                    <div className="film-dots-left" />
                    <div className="film-slot" />
                    <div className="film-dots-right" />
                </div>
            );
        case 'y2k':
            return (
                <div className="mockup-y2k-frame">
                    <span className="y2k-star top-left">✦</span>
                    <div className="y2k-slot" />
                    <span className="y2k-star bottom-right">✦</span>
                </div>
            );
        case 'washi':
            return (
                <div className="mockup-washi-frame">
                    <div className="washi-tape-sticker" />
                    <div className="washi-slot" />
                </div>
            );
        case 'emerald':
            return (
                <div className="mockup-emerald-frame">
                    <div className="emerald-slot" />
                </div>
            );
        case 'noir':
            return (
                <div className="mockup-noir-frame">
                    <div className="noir-slot" />
                </div>
            );
        case 'arcade':
            return (
                <div className="mockup-arcade-frame">
                    <span className="arcade-icon">👾</span>
                    <div className="arcade-slot" />
                </div>
            );
        default:
            return <div className="mockup-default-frame" />;
    }
}



export default function Step2Customize({
    shots,
    selectedLayout = '4-cut',
    selectedFrame,
    setSelectedFrame,
    selectedFilter,
    setSelectedFilter,
    stickers = [],
    setStickers,
    logoImg,
    onBack,
    onProceed,
}) {
    const canvasRef = useRef(null);
    const previewWrapperRef = useRef(null);

    const [activeTab, setActiveTab] = useState('frames'); // 'frames' | 'stickers'
    const [selectedStickerId, setSelectedStickerId] = useState(null);
    const [draggingId, setDraggingId] = useState(null);

    // Filter available frames: "Red Spartan Scallop" only available for '2-cut' (Duo Strip)
    const availableFrames = FRAMES.filter(f => !f.allowedLayouts || f.allowedLayouts.includes(selectedLayout));

    const [frameCategory, setFrameCategory] = useState('brainrot'); // 'brainrot' | 'climate' | 'red' | 'aesthetic' | 'all'

    const displayedFrames = useMemo(() => {
        if (frameCategory === 'brainrot') return availableFrames.filter(f => f.id.startsWith('brainrot_'));
        if (frameCategory === 'climate') return availableFrames.filter(f => f.id.startsWith('climate_t'));
        if (frameCategory === 'red') return availableFrames.filter(f => f.id.startsWith('spartan') || f.id.startsWith('cherry') || f.id.startsWith('cyber_scarlet') || f.id.startsWith('klique'));
        if (frameCategory === 'aesthetic') return availableFrames.filter(f => !f.id.startsWith('climate_t') && !f.id.startsWith('brainrot_') && !f.id.startsWith('spartan') && !f.id.startsWith('cherry') && !f.id.startsWith('cyber_scarlet') && !f.id.startsWith('klique'));
        return availableFrames;
    }, [availableFrames, frameCategory]);

    // Fallback frame if current frame is not available for this layout (e.g. 4-cut)
    useEffect(() => {
        if (selectedFrame === 'klique_scallop' && selectedLayout !== '2-cut') {
            setSelectedFrame('kodak_35mm');
        }
    }, [selectedLayout, selectedFrame, setSelectedFrame]);

    // Re-render canvas on state change
    useEffect(() => {
        if (canvasRef.current && shots && shots.length > 0) {
            renderPhotoStrip(canvasRef.current, shots, selectedFrame, selectedFilter, logoImg, selectedLayout, stickers);
        }
    }, [shots, selectedLayout, selectedFrame, selectedFilter, stickers, logoImg]);

    // Add new vector sticker to canvas
    const handleAddSticker = (item) => {
        const newStk = {
            id: 'stk_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            content: item.content,
            label: item.label,
            type: item.type,
            bgColor: item.bgColor,
            textColor: item.textColor,
            color: item.color,
            x: 0.5 + (Math.random() * 0.2 - 0.1),
            y: 0.5 + (Math.random() * 0.2 - 0.1),
            size: item.size || 48,
            rotation: Math.floor(Math.random() * 20 - 10),
        };
        setStickers(prev => [...prev, newStk]);
        setSelectedStickerId(newStk.id);
    };

    // Remove sticker
    const handleDeleteSticker = (id, e) => {
        if (e) e.stopPropagation();
        setStickers(prev => prev.filter(s => s.id !== id));
        if (selectedStickerId === id) setSelectedStickerId(null);
    };

    // Clear all stickers
    const handleClearAllStickers = () => {
        setStickers([]);
        setSelectedStickerId(null);
    };

    // Resize active sticker
    const handleUpdateSize = (id, newSize) => {
        setStickers(prev => prev.map(s => s.id === id ? { ...s, size: Math.max(24, Math.min(110, newSize)) } : s));
    };

    // Rotate active sticker
    const handleUpdateRotation = (id, newRot) => {
        setStickers(prev => prev.map(s => s.id === id ? { ...s, rotation: newRot } : s));
    };

    // ── Drag & Drop Handling ──────────────────────────────────────────────────
    const handlePointerDown = (id, e) => {
        e.stopPropagation();
        setSelectedStickerId(id);
        setDraggingId(id);
    };

    const handlePointerMove = useCallback((e) => {
        if (!draggingId || !previewWrapperRef.current) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const rect = previewWrapperRef.current.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const rawX = (clientX - rect.left) / rect.width;
        const rawY = (clientY - rect.top) / rect.height;

        const clampedX = Math.max(0.04, Math.min(0.96, rawX));
        const clampedY = Math.max(0.04, Math.min(0.96, rawY));

        setStickers(prev => prev.map(s => s.id === draggingId ? { ...s, x: clampedX, y: clampedY } : s));
    }, [draggingId, setStickers]);

    const handlePointerUp = useCallback(() => {
        setDraggingId(null);
    }, []);

    useEffect(() => {
        if (draggingId) {
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('mouseup', handlePointerUp);
            window.addEventListener('touchmove', handlePointerMove, { passive: false });
            window.addEventListener('touchend', handlePointerUp);
        }
        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('touchend', handlePointerUp);
        };
    }, [draggingId, handlePointerMove, handlePointerUp]);

    const activeSticker = stickers.find(s => s.id === selectedStickerId);

    return (
        <section className="panel step2-layout">
            <div className="design-controls">
                <div className="step-title-row" style={{ marginBottom: '14px' }}>
                    <div>
                        <div className="step-title">Step 3 — Customize Design</div>
                        <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--forest-2, #40584c)' }}>
                            Personalize your frames, filters, and drag-and-drop modern vector decals!
                        </p>
                    </div>
                </div>

                {/* Customization Tabs */}
                <div className="customize-tabs">
                    <button
                        type="button"
                        className={`tab-btn ${activeTab === 'frames' ? 'active' : ''}`}
                        onClick={() => setActiveTab('frames')}
                    >
                        🎨 Frame & Filter
                    </button>
                    <button
                        type="button"
                        className={`tab-btn ${activeTab === 'stickers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('stickers')}
                    >
                        🎀 Vector Stickers & Badges
                        {stickers.length > 0 && <span className="tab-badge">{stickers.length}</span>}
                    </button>
                </div>

                {/* TAB 1: FRAMES & FILTERS */}
                {activeTab === 'frames' && (
                    <div className="tab-content">
                        <div className="side-subhead">PHOTO FILTER</div>
                        <div className="filters">
                            {FILTERS.map(f => (
                                <button
                                    key={f.id}
                                    type="button"
                                    className={`filter-btn ${selectedFilter === f.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedFilter(f.id)}
                                >
                                    <span style={{ marginRight: '5px' }}>{f.icon}</span>
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        <div className="side-subhead" style={{ marginTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>GRAPHIC FRAME THEME</span>
                            {selectedLayout === '2-cut' && <span style={{ opacity: 0.8, fontSize: '11px', color: '#681B24' }}>★ Duo Strip Exclusive Unlocked</span>}
                        </div>

                        {/* Category Filter Pills */}
                        <div className="frame-category-pills">
                            <button
                                type="button"
                                className={`frame-cat-pill ${frameCategory === 'all' ? 'active' : ''}`}
                                onClick={() => setFrameCategory('all')}
                            >
                                🌟 All ({availableFrames.length})
                            </button>
                            <button
                                type="button"
                                className={`frame-cat-pill ${frameCategory === 'brainrot' ? 'active' : ''}`}
                                onClick={() => setFrameCategory('brainrot')}
                            >
                                🧠 Brainrot Memes (7)
                            </button>
                            <button
                                type="button"
                                className={`frame-cat-pill ${frameCategory === 'climate' ? 'active' : ''}`}
                                onClick={() => setFrameCategory('climate')}
                            >
                                🌿 Climate Action (3)
                            </button>
                            <button
                                type="button"
                                className={`frame-cat-pill ${frameCategory === 'red' ? 'active' : ''}`}
                                onClick={() => setFrameCategory('red')}
                            >
                                🔥 Red Editions ({availableFrames.filter(f => f.id.startsWith('spartan') || f.id.startsWith('cherry') || f.id.startsWith('cyber_scarlet') || f.id.startsWith('klique')).length})
                            </button>
                            <button
                                type="button"
                                className={`frame-cat-pill ${frameCategory === 'aesthetic' ? 'active' : ''}`}
                                onClick={() => setFrameCategory('aesthetic')}
                            >
                                🎀 Vintage & Film (4)
                            </button>
                        </div>

                        <div className="rich-frame-grid">
                            {displayedFrames.map(f => {
                                const isSelected = selectedFrame === f.id;
                                return (
                                    <div
                                        key={f.id}
                                        className={`rich-frame-card ${isSelected ? 'selected' : ''}`}
                                        onClick={() => setSelectedFrame(f.id)}
                                        style={{ '--card-bg': f.cardBg }}
                                    >
                                        <div className="rich-frame-tag">{f.tag}</div>

                                        <div className="rich-frame-mockup" data-pattern={f.pattern}>
                                            <FrameMockupPreview pattern={f.pattern} />
                                        </div>

                                        <div className="rich-frame-info">
                                            <div className="rich-frame-name">{f.label}</div>
                                            <div className="rich-frame-sub">{f.sub}</div>
                                        </div>

                                        <div className="rich-frame-radio">
                                            <span className="radio-circle">{isSelected ? '●' : ''}</span>
                                            <span>{isSelected ? 'Applied' : 'Select'}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* TAB 2: VECTOR STICKERS & BADGES */}
                {activeTab === 'stickers' && (
                    <div className="tab-content stickers-panel">
                        <p style={{ fontSize: '12px', color: 'var(--forest-2, #40584c)', margin: '0 0 12px' }}>
                            👉 Tap any modern vector sticker, then <strong>drag to position anywhere on the strip</strong>!
                        </p>

                        {STICKER_PACKS.map(pack => (
                            <div key={pack.category} className="sticker-category-box">
                                <div className="sticker-cat-title">{pack.category}</div>
                                <div className="sticker-items-row">
                                    {pack.items.map(item => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className="sticker-palette-btn vector-btn"
                                            onClick={() => handleAddSticker(item)}
                                            title={item.label}
                                        >
                                            {renderStickerSvgIcon(item, 34)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Active Sticker Adjustments */}
                        {activeSticker && (
                            <div className="sticker-toolbar-card">
                                <div className="toolbar-header">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {renderStickerSvgIcon(activeSticker, 20)}
                                        <span>Selected: <strong>{activeSticker.label || activeSticker.content}</strong></span>
                                    </span>
                                    <button
                                        type="button"
                                        className="delete-stk-btn"
                                        onClick={(e) => handleDeleteSticker(activeSticker.id, e)}
                                    >
                                        ✕ Delete
                                    </button>
                                </div>

                                <div className="toolbar-sliders">
                                    <div className="slider-row">
                                        <label>Size ({activeSticker.size}px)</label>
                                        <input
                                            type="range"
                                            min="24"
                                            max="96"
                                            value={activeSticker.size || 48}
                                            onChange={(e) => handleUpdateSize(activeSticker.id, parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="slider-row">
                                        <label>Rotation ({activeSticker.rotation || 0}°)</label>
                                        <input
                                            type="range"
                                            min="-45"
                                            max="45"
                                            value={activeSticker.rotation || 0}
                                            onChange={(e) => handleUpdateRotation(activeSticker.id, parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {stickers.length > 0 && (
                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                                <button
                                    type="button"
                                    className="ghost"
                                    onClick={handleClearAllStickers}
                                    style={{ fontSize: '11px', padding: '6px 12px' }}
                                >
                                    🗑️ Clear All Decals ({stickers.length})
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="step-actions" style={{ marginTop: '20px' }}>
                    <button className="ghost" onClick={onBack}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Retake Photos
                    </button>
                    <button className="highlight" onClick={onProceed}>
                        Confirm & Generate
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* LIVE PREVIEW + DRAG OVERLAY */}
            <div className="preview-pane">
                <div className="side-subhead" style={{ marginTop: 0 }}>
                    LIVE DESIGN PREVIEW
                    {stickers.length > 0 && <span style={{ opacity: 0.7, marginLeft: '6px' }}>({stickers.length} decals)</span>}
                </div>

                <div
                    ref={previewWrapperRef}
                    className="canvas-preview-wrapper"
                    style={{ position: 'relative', display: 'inline-block', maxWidth: '380px', width: '100%' }}
                >
                    <canvas
                        ref={canvasRef}
                        className="final-canvas"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />

                    {/* Interactive Sticker Overlay Elements for Dragging */}
                    {stickers.map(stk => {
                        const isSelected = selectedStickerId === stk.id;
                        return (
                            <div
                                key={stk.id}
                                className={`sticker-drag-handle ${isSelected ? 'selected' : ''}`}
                                style={{
                                    left: `${stk.x * 100}%`,
                                    top: `${stk.y * 100}%`,
                                    transform: `translate(-50%, -50%) rotate(${stk.rotation || 0}deg)`,
                                }}
                                onMouseDown={(e) => handlePointerDown(stk.id, e)}
                                onTouchStart={(e) => handlePointerDown(stk.id, e)}
                            >
                                {isSelected && (
                                    <button
                                        type="button"
                                        className="stk-quick-delete"
                                        onClick={(e) => handleDeleteSticker(stk.id, e)}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {stickers.length > 0 && (
                    <p style={{ fontSize: '11px', color: 'var(--forest-2, #40584c)', marginTop: '8px', textAlign: 'center' }}>
                        💡 <em>Click & drag any decal on the photo strip to move it.</em>
                    </p>
                )}
            </div>
        </section>
    );
}
