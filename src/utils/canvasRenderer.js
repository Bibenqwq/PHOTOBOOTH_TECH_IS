export const FILTER_CSS = {
    normal: 'none',
    bw: 'grayscale(100%) contrast(120%)',
    vintage: 'sepia(45%) saturate(110%) contrast(105%) brightness(102%)',
    warm: 'sepia(25%) saturate(140%) brightness(105%)',
    cool: 'hue-rotate(185deg) saturate(115%) contrast(105%)',
    film: 'contrast(125%) brightness(95%) saturate(85%) sepia(20%)'
};

export const LAYOUTS = [
    { id: '2-cut', count: 2, label: 'Duo Strip', sub: '2 Photos', desc: 'Quick 2-shot vertical strip', type: 'vertical' },
    { id: '3-cut', count: 3, label: 'Trio Strip', sub: '3 Photos', desc: 'Classic 3-shot vertical strip', type: 'vertical' },
    { id: '4-cut', count: 4, label: 'Classic 4-Cut', sub: '4 Photos', desc: 'Standard 4-shot photobooth strip', type: 'vertical' },
    { id: '2x2', count: 4, label: '2x2 Quad Grid', sub: '4 Photos (Grid)', desc: '2x2 quad poster format', type: 'grid' },
];

export const STICKER_PACKS = [
    {
        category: '🏛️ Colleges & Spartan Pride',
        items: [
            { id: 'badge_cics', content: 'CICS', label: 'CICS', type: 'badge', bgColor: '#F77F00', textColor: '#003049', borderColor: '#F77F00', size: 48 },
            { id: 'badge_cas', content: 'CAS', label: 'CAS', type: 'badge', bgColor: '#681B24', textColor: '#F4B41A', borderColor: '#F4B41A', size: 48 },
            { id: 'badge_cabe', content: 'CABE', label: 'CABE', type: 'badge', bgColor: '#1D3557', textColor: '#FFD166', borderColor: '#FFD166', size: 48 },
            { id: 'badge_cete', content: 'CETE', label: 'CETE', type: 'badge', bgColor: '#D62828', textColor: '#F8F9FA', borderColor: '#FFFFFF', size: 48 },
            { id: 'badge_cte', content: 'CTE', label: 'CTE', type: 'badge', bgColor: '#2A9D8F', textColor: '#FFF3B0', borderColor: '#FFF3B0', size: 48 },
            { id: 'badge_spartan', content: 'RED SPARTAN', label: 'RED SPARTAN', type: 'badge', bgColor: '#681B24', textColor: '#FBF6EB', borderColor: '#F4B41A', size: 48 },
            { id: 'badge_batstateu', content: 'BATSTATE-U', label: 'BATSTATE-U', type: 'badge', bgColor: '#8B0000', textColor: '#FFFFFF', borderColor: '#FFFFFF', size: 48 },
            { id: 'badge_deans_list', content: 'DEAN\'S LIST ✦', label: 'DEAN\'S LIST', type: 'badge', bgColor: '#173F30', textColor: '#F4B41A', borderColor: '#F4B41A', size: 48 },
            { id: 'badge_grad', content: 'GRADUATE 🎓', label: 'GRADUATE', type: 'badge', bgColor: '#141414', textColor: '#F4B41A', borderColor: '#F4B41A', size: 48 },
        ]
    },
    {
        category: '🎀 Coquette & Romantic Aesthetic',
        items: [
            { id: 'v_bow', type: 'vector_bow', label: 'Pink Satin Bow', color: '#FF4D6D', size: 52 },
            { id: 'v_bow_burgundy', type: 'vector_bow', label: 'Spartan Bow', color: '#681B24', size: 52 },
            { id: 'v_heart', type: 'vector_heart', label: 'Glossy Heart', color: '#E63946', size: 48 },
            { id: 'v_heart_white', type: 'vector_heart', label: 'Pearl Heart', color: '#FFFFFF', size: 48 },
            { id: 'v_sparkle_heart', type: 'vector_sparkle_heart', label: 'Cyber Heart', color: '#FF758F', size: 50 },
            { id: 'v_kiss_lips', type: 'vector_kiss_lips', label: 'Kiss Mark', color: '#D90429', size: 48 },
            { id: 'v_rose', type: 'vector_rose', label: 'Rose Bloom', color: '#C9184A', size: 48 },
            { id: 'v_butterfly', type: 'vector_butterfly', label: 'Butterfly', color: '#B5179E', size: 50 },
            { id: 'v_cherry', type: 'vector_cherry', label: 'Glossy Cherries', color: '#D90429', size: 48 },
            { id: 'v_flower', type: 'vector_flower', label: 'Daisy Blossom', color: '#FFB703', size: 48 },
            { id: 'v_clover', type: 'vector_clover', label: 'Lucky Clover', color: '#38B000', size: 48 },
            { id: 'v_angel_wings', type: 'vector_angel_wings', label: 'Angel Wings', color: '#FFFFFF', size: 54 },
        ]
    },
    {
        category: '⭐ Y2K & Cyber Chrome Vectors',
        items: [
            { id: 'v_star4_gold', type: 'vector_star4', label: 'Chrome Gold Star', color: '#F4B41A', size: 48 },
            { id: 'v_star4_burgundy', type: 'vector_star4', label: 'Spartan Star', color: '#681B24', size: 48 },
            { id: 'v_star4_silver', type: 'vector_star4', label: 'Silver Chrome', color: '#E5D4FF', size: 48 },
            { id: 'v_star8', type: 'vector_star8', label: '8-Point Burst', color: '#F72585', size: 50 },
            { id: 'v_cyber_cross', type: 'vector_cyber_cross', label: 'Cyber Cross', color: '#4CC9F0', size: 48 },
            { id: 'v_sparkles', type: 'vector_sparkles', label: 'Sparkle Trio', color: '#F4B41A', size: 50 },
            { id: 'v_flame', type: 'vector_flame', label: 'Cyber Flame', color: '#FF5400', size: 50 },
            { id: 'v_lightning', type: 'vector_lightning', label: 'Lightning Bolt', color: '#FFD166', size: 48 },
            { id: 'v_crown', type: 'vector_crown', label: 'Royal Crown', color: '#F4B41A', size: 50 },
            { id: 'v_sunglasses', type: 'vector_sunglasses', label: 'Cyber Shades', color: '#141414', size: 50 },
            { id: 'v_camera', type: 'vector_camera', label: 'Retro Snapshot', color: '#173F30', size: 50 },
            { id: 'v_music_note', type: 'vector_music_note', label: 'Music Notes', color: '#7209B7', size: 48 },
        ]
    },
    {
        category: '🏷️ Photobooth Moments & Word Badges',
        items: [
            { id: 'badge_booth', content: 'PHOTO BOOTH', label: 'PHOTO BOOTH', type: 'badge', bgColor: '#141414', textColor: '#F4B41A', size: 48 },
            { id: 'badge_love', content: 'LOVE ♡', label: 'LOVE ♡', type: 'badge', bgColor: '#E63946', textColor: '#FFFFFF', size: 48 },
            { id: 'badge_besties', content: 'BESTIES ✦', label: 'BESTIES ✦', type: 'badge', bgColor: '#FF758F', textColor: '#FFFFFF', size: 48 },
            { id: 'badge_cute', content: 'SUPER CUTE', label: 'SUPER CUTE', type: 'badge', bgColor: '#173F30', textColor: '#FFFFFF', size: 48 },
            { id: 'badge_vibes', content: 'GOOD VIBES ✦', label: 'GOOD VIBES', type: 'badge', bgColor: '#4361EE', textColor: '#FFFFFF', size: 48 },
            { id: 'badge_archive', content: 'ARCHIVE · 2026', label: 'ARCHIVE · 2026', type: 'badge', bgColor: '#2E4057', textColor: '#FFFFFF', size: 48 },
            { id: 'badge_forever', content: 'FOREVER & ALWAYS', label: 'FOREVER', type: 'badge', bgColor: '#681B24', textColor: '#FFFFFF', size: 48 },
        ]
    }
];

export const THEME = {
    spartan_crimson: {
        id: 'spartan_crimson',
        label: 'Red Spartan Varsity',
        sub: 'Deep Crimson & Gold Foil Trim',
        category: 'Red Edition',
        bg: '#7A0C16',
        textColor: '#F4B41A',
        accentColor: '#F4B41A',
        line: '#D4AF37',
        styleType: 'spartan_crimson',
        footerTitle: 'RED SPARTAN',
        footerSub: '✦ LEAD THE WAY · BATSTATE-U · 2026 ✦',
        previewPattern: 'spartan'
    },
    cherry_velvet: {
        id: 'cherry_velvet',
        label: 'Cherry Velvet & Bows',
        sub: 'French Cherry & Pearl Trim',
        category: 'Red Edition',
        bg: '#9E1B32',
        textColor: '#FFF0F3',
        accentColor: '#FF758F',
        line: '#FFCCD5',
        styleType: 'cherry_velvet',
        footerTitle: 'Cherry Memories',
        footerSub: '♡ SWEET CHERRY ARCHIVE ♡',
        previewPattern: 'cherry'
    },
    cyber_scarlet: {
        id: 'cyber_scarlet',
        label: 'Scarlet Cyber Stars',
        sub: 'Vibrant Scarlet & Chrome Stars',
        category: 'Red Edition',
        bg: '#D90429',
        textColor: '#FFFFFF',
        accentColor: '#FFD166',
        line: '#FF8FA3',
        styleType: 'cyber_scarlet',
        footerTitle: 'SCARLET VAULT',
        footerSub: '★ Y2K CYBER RED EDITION ★',
        previewPattern: 'scarlet'
    },
    klique_scallop: {
        id: 'klique_scallop',
        label: 'Red Spartan Scallop',
        sub: 'Vintage Striped Lace Oval',
        category: 'Vintage Retro',
        bg: '#FBF6EB',
        textColor: '#681B24',
        accentColor: '#681B24',
        stripeColor: '#681B24',
        line: '#681B24',
        styleType: 'scallop_oval',
        footerTitle: 'Red Spartan',
        footerSub: '✦ VINTAGE PHOTO STUDIO ✦',
        previewPattern: 'scallop'
    },
    coquette_bow: {
        id: 'coquette_bow',
        label: 'Coquette Ribbons',
        sub: 'Pastel Blush & Satin Bows',
        category: 'Aesthetic',
        bg: '#FFF0F3',
        textColor: '#C9184A',
        accentColor: '#FF758F',
        line: '#FFCCD5',
        styleType: 'coquette',
        footerTitle: 'Cherished Moments',
        footerSub: '♡ LOVELY ARCHIVE ♡',
        previewPattern: 'bow'
    },
    kodak_35mm: {
        id: 'kodak_35mm',
        label: '35mm Film Leader',
        sub: 'Real Sprocket Holes & ISO Stamp',
        category: 'Analog Film',
        bg: '#141414',
        textColor: '#F4B41A',
        accentColor: '#E63946',
        line: '#282828',
        styleType: 'film_35mm',
        footerTitle: 'KODAK PORTRA 400',
        footerSub: 'EXP 24 · PROCESS C-41 · 35MM',
        previewPattern: 'film'
    },
    y2k_cyber: {
        id: 'y2k_cyber',
        label: 'Y2K Cyber Chrome',
        sub: 'Silver Stars & Hologram Heart',
        category: 'Y2K Trend',
        bg: '#18122B',
        textColor: '#E5D4FF',
        accentColor: '#9B51E0',
        line: '#6C4AB6',
        styleType: 'y2k_stars',
        footerTitle: 'Y2K · CYBER VAULT',
        footerSub: '✦ DIGITAL MEMORY STREAM ✦',
        previewPattern: 'y2k'
    },
    korean_washi: {
        id: 'korean_washi',
        label: 'Korean Photomaton',
        sub: 'Pastel Washi Tape & Doodles',
        category: 'Korean Style',
        bg: '#F6F4EE',
        textColor: '#2E4057',
        accentColor: '#048A81',
        line: '#E0DDD5',
        styleType: 'washi_tape',
        footerTitle: 'LIFE FOUR CUTS',
        footerSub: 'STUDIO MEMORIES · 2026',
        previewPattern: 'washi'
    },
    // =========================================================================
    // 🌿 CLIMATE ACTION & PASTEL AESTHETIC SERIES (TEMPLATES 01 - 08)
    // =========================================================================
    climate_sage_earth: {
        id: 'climate_sage_earth',
        label: 'Think Green Sage',
        sub: 'Template 01 · Forest Green & Earth',
        category: 'Climate Action',
        bg: '#E2EBE0',
        textColor: '#1B4332',
        accentColor: '#2D6A4F',
        line: '#1B4332',
        styleType: 'climate_t1',
        footerTitle: 'THINK GREEN · LIVE CLEAN',
        footerSub: 'TECH IS · CLIMATE ACTION · 2026',
        previewPattern: 'climate_t1'
    },
    climate_bear_matcha: {
        id: 'climate_bear_matcha',
        label: 'Matcha Bear Impact',
        sub: 'Template 02 · Cute Mascot & Cream',
        category: 'Climate Action',
        bg: '#EBF3E7',
        textColor: '#2D5A27',
        accentColor: '#52B788',
        line: '#2D5A27',
        styleType: 'climate_t2',
        footerTitle: 'SMALL ACTIONS, BIG IMPACT ♡',
        footerSub: 'TECH IS · CLIMATE ACTION · 2026',
        previewPattern: 'climate_t2'
    },
    climate_lavender_heal: {
        id: 'climate_lavender_heal',
        label: 'Lavender Heal Planet',
        sub: 'Template 03 · Lilac Rainbow & Heart',
        category: 'Climate Action',
        bg: '#EFEAF8',
        textColor: '#5E4B8B',
        accentColor: '#9D84B7',
        line: '#5E4B8B',
        styleType: 'climate_t3',
        footerTitle: 'LET\'S HEAL OUR PLANET',
        footerSub: 'TECH IS · CLIMATE ACTION · 2026',
        previewPattern: 'climate_t3'
    },
    // 🧠 BRAINROT & GEN-Z MEME SERIES (7 VIRAL DESIGNS)
    brainrot_mewing_sigma: {
        id: 'brainrot_mewing_sigma',
        label: 'Sigma Mewing & Mog',
        sub: 'Bye Bye 🤫🧏‍♂️ · Jawline Rizz',
        category: 'Brainrot Memes',
        bg: '#121214',
        textColor: '#FFD700',
        accentColor: '#00E5FF',
        line: '#FFD700',
        styleType: 'brainrot_sigma',
        footerTitle: 'BYE BYE 🤫🧏‍♂️ · MOGGING',
        footerSub: 'TECH IS · 10,000+ AURA · 2026',
        previewPattern: 'brainrot_sigma_mockup'
    },
    brainrot_skibidi_toilet: {
        id: 'brainrot_skibidi_toilet',
        label: 'Skibidi Rizz Dop Dop',
        sub: 'Dop Dop Yes Yes · Y2K Glitch',
        category: 'Brainrot Memes',
        bg: '#0B0A12',
        textColor: '#00F0FF',
        accentColor: '#FF0055',
        line: '#00F0FF',
        styleType: 'brainrot_skibidi',
        footerTitle: 'SKIBIDI DOP DOP YES YES',
        footerSub: 'TECH IS · BRAINROT CERTIFIED',
        previewPattern: 'brainrot_skibidi_mockup'
    },
    brainrot_chill_guy: {
        id: 'brainrot_chill_guy',
        label: 'Just A Chill Guy',
        sub: 'Low Stress · Unbothered King',
        category: 'Brainrot Memes',
        bg: '#F6EFE6',
        textColor: '#4A3525',
        accentColor: '#DDA15E',
        line: '#6B4E3D',
        styleType: 'brainrot_chill',
        footerTitle: 'JUST A CHILL GUY AT TECH IS',
        footerSub: '☕ UNBOTHERED · FULLY RELAXED · 2026',
        previewPattern: 'brainrot_chill_mockup'
    },
    brainrot_rizzler: {
        id: 'brainrot_rizzler',
        label: 'Unspoken W Rizz',
        sub: 'The Ultimate Rizzler · 🍷',
        category: 'Brainrot Memes',
        bg: '#4A050B',
        textColor: '#FFE6A7',
        accentColor: '#FF4D6D',
        line: '#FFCCD5',
        styleType: 'brainrot_rizzler',
        footerTitle: 'UNSPOKEN RIZZ · W RIZZ ONLY',
        footerSub: 'TECH IS · NO CAP · 2026 ✦',
        previewPattern: 'brainrot_rizzler_mockup'
    },
    brainrot_grimace_shake: {
        id: 'brainrot_grimace_shake',
        label: 'Gyatt & Grimace Shake',
        sub: 'Purple Chaos · Level 100 Gyatt',
        category: 'Brainrot Memes',
        bg: '#240046',
        textColor: '#E0AAFF',
        accentColor: '#70E000',
        line: '#C77DFF',
        styleType: 'brainrot_grimace',
        footerTitle: 'LEVEL 100 GYATT · CHAOS',
        footerSub: 'TECH IS · GRIMACE INCIDENT · 2026',
        previewPattern: 'brainrot_grimace_mockup'
    },
    brainrot_capybara: {
        id: 'brainrot_capybara',
        label: 'Ok I Pull Up Capybara',
        sub: 'Coconut Doggy · Sunset Chill 🍊',
        category: 'Brainrot Memes',
        bg: '#FFF1E6',
        textColor: '#7F4F24',
        accentColor: '#F77F00',
        line: '#936639',
        styleType: 'brainrot_capybara',
        footerTitle: 'OK I PULL UP 🦫 COCONUT DOG',
        footerSub: 'TECH IS · HOP OUT AT THE AFTER PARTY',
        previewPattern: 'brainrot_capybara_mockup'
    },
    brainrot_subo_tung: {
        id: 'brainrot_subo_tung',
        label: 'Tung Tung & Aura Master',
        sub: 'What Da Hell · 1,000,000 Aura',
        category: 'Brainrot Memes',
        bg: '#0A0A0A',
        textColor: '#CCFF00',
        accentColor: '#FF0033',
        line: '#CCFF00',
        styleType: 'brainrot_tung',
        footerTitle: '💥 WHAT DA HEELL · 1M AURA 💥',
        footerSub: 'TECH IS · ULTIMATE BRAINROT · 2026',
        previewPattern: 'brainrot_tung_mockup'
    },
    climate: {
        id: 'climate',
        label: 'Tech Emerald Classic',
        sub: 'Classic Forest Green & Gold',
        category: 'Signature',
        bg: '#173F30',
        textColor: '#F2F0E7',
        accentColor: '#D4AF37',
        line: '#2B5F44',
        styleType: 'classic_clean',
        headerTitle: 'Tech IS',
        headerSub: 'OFFICIAL PHOTO BOOTH',
        title: 'TECH IS: FUTURE IN ACTION',
        sub: 'EXHIBIT SOUVENIR · 2026',
        previewPattern: 'emerald'
    },
    noir: {
        id: 'noir',
        label: 'Noir Studio',
        sub: 'Editorial Monochrome Luxury',
        category: 'Monochrome',
        bg: '#050505',
        textColor: '#FFFFFF',
        accentColor: '#AAAAAA',
        line: '#262626',
        styleType: 'editorial_noir',
        headerTitle: 'Tech IS · NOIR',
        headerSub: 'MONOCHROME EDITORIAL · 2026',
        title: 'TECH IS ARCHIVE COLLECTION',
        sub: 'PERMANENT EXHIBIT SOUVENIR',
        previewPattern: 'noir'
    },
    retro_arcade: {
        id: 'retro_arcade',
        label: 'Retro Neon Pop',
        sub: 'Vaporwave Sunset & Pixels',
        category: 'Vaporwave',
        bg: '#24103A',
        textColor: '#FDE2E4',
        accentColor: '#FF6B8B',
        line: '#7B2CBF',
        styleType: 'retro_arcade',
        headerTitle: 'Tech IS · SUNSET',
        headerSub: 'DREAMSCAPE EDITION · MEMORY',
        title: 'TECH IS VAPORWAVE LAB',
        sub: 'FUTURE HERITAGE · 2026',
        previewPattern: 'arcade'
    }
};

export function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

export function wrapCenterText(ctx, text, cx, y, maxWidth, lineHeight) {
    const words = (text || '').split(' ');
    let line = '';
    let lines = [];
    words.forEach(w => {
        const test = line ? line + ' ' + w : w;
        if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line); line = w;
        } else { line = test; }
    });
    lines.push(line);
    const startY = y - (lines.length - 1) * lineHeight / 2;
    lines.forEach((l, i) => ctx.fillText(l, cx, startY + i * lineHeight));
}

// ── Decorative Drawing Helpers ───────────────────────────────────────────────

/**
 * Draws a 4-point or 8-point sparkle star (Y2K style)
 */
export function drawSparkleStar(ctx, cx, cy, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    // 4 sharp concave points
    ctx.moveTo(cx, cy - size);
    ctx.quadraticCurveTo(cx, cy, cx + size, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy + size);
    ctx.quadraticCurveTo(cx, cy, cx - size, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy - size);
    ctx.fill();

    // Inner bright center dot
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

/**
 * Draws a cute coquette bow ribbon
 */
export function drawSatinBow(ctx, cx, cy, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;

    const w = size;
    const h = size * 0.65;

    // Left loop
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(cx - w, cy - h, cx - w, cy + h, cx, cy);
    ctx.fill();

    // Right loop
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(cx + w, cy - h, cx + w, cy + h, cx, cy);
    ctx.fill();

    // Center knot
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.stroke();

    // Tails
    ctx.beginPath();
    ctx.moveTo(cx - 2, cy + 2);
    ctx.quadraticCurveTo(cx - w * 0.5, cy + h * 1.3, cx - w * 0.7, cy + h * 1.5);
    ctx.moveTo(cx + 2, cy + 2);
    ctx.quadraticCurveTo(cx + w * 0.5, cy + h * 1.3, cx + w * 0.7, cy + h * 1.5);
    ctx.stroke();

    ctx.restore();
}

/**
 * Draws a cute kawaii Earth mascot with blush and smiling face
 */
export function drawCuteEarth(ctx, cx, cy, r) {
    ctx.save();
    // Ocean
    ctx.fillStyle = '#64B5F6';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1B4332';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Continents / Green land
    ctx.fillStyle = '#81C784';
    ctx.beginPath();
    ctx.arc(cx - r * 0.35, cy - r * 0.25, r * 0.45, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.4, cy + r * 0.2, r * 0.38, 0, Math.PI * 2);
    ctx.arc(cx - r * 0.2, cy + r * 0.45, r * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#1B4332';
    ctx.beginPath();
    ctx.arc(cx - r * 0.3, cy - r * 0.05, 3.5, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.3, cy - r * 0.05, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Eye sparkles
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx - r * 0.3 - 1, cy - r * 0.05 - 1, 1.2, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.3 - 1, cy - r * 0.05 - 1, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Pink Blush
    ctx.fillStyle = 'rgba(255, 138, 128, 0.7)';
    ctx.beginPath();
    ctx.arc(cx - r * 0.42, cy + r * 0.12, 4, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.42, cy + r * 0.12, 4, 0, Math.PI * 2);
    ctx.fill();

    // Smiling Mouth
    ctx.strokeStyle = '#1B4332';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.05, 5, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    ctx.restore();
}

/**
 * Draws a cute brown bear mascot holding or smiling
 */
export function drawCuteBear(ctx, cx, cy, size) {
    ctx.save();
    const r = size * 0.4;

    // Ears
    ctx.fillStyle = '#D7A86E';
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(cx - r * 0.7, cy - r * 0.7, r * 0.35, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.7, cy - r * 0.7, r * 0.35, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Inner Ears
    ctx.fillStyle = '#FFD1B3';
    ctx.beginPath();
    ctx.arc(cx - r * 0.7, cy - r * 0.7, r * 0.18, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.7, cy - r * 0.7, r * 0.18, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#E8B87D';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Snout
    ctx.fillStyle = '#FFF2DF';
    ctx.beginPath();
    ctx.ellipse(cx, cy + r * 0.2, r * 0.4, r * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#5D4037';
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.1, 3, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.beginPath();
    ctx.arc(cx - r * 0.35, cy - r * 0.1, 3, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.35, cy - r * 0.1, 3, 0, Math.PI * 2);
    ctx.fill();

    // Blush
    ctx.fillStyle = 'rgba(255, 140, 140, 0.6)';
    ctx.beginPath();
    ctx.arc(cx - r * 0.5, cy + r * 0.15, 4, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.5, cy + r * 0.15, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

/**
 * Draws a cute rainbow
 */
export function drawCuteRainbow(ctx, cx, cy, size) {
    ctx.save();
    const colors = ['#FF8FA3', '#FFD166', '#80ED99', '#90E0EF', '#C77DFF'];
    colors.forEach((col, idx) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = size * 0.12;
        ctx.beginPath();
        ctx.arc(cx, cy, size * (0.8 - idx * 0.13), Math.PI, 0);
        ctx.stroke();
    });
    ctx.restore();
}

/**
 * Draws a cute smiley heart mascot
 */
export function drawCuteSmileyHeart(ctx, cx, cy, size, color = '#FF758F') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#681B24';
    ctx.lineWidth = 2;

    const s = size * 0.45;
    ctx.beginPath();
    ctx.moveTo(cx, cy + s * 0.8);
    ctx.bezierCurveTo(cx - s * 1.3, cy - s * 0.2, cx - s * 1.1, cy - s * 1.1, cx, cy - s * 0.3);
    ctx.bezierCurveTo(cx + s * 1.1, cy - s * 1.1, cx + s * 1.3, cy - s * 0.2, cx, cy + s * 0.8);
    ctx.fill(); ctx.stroke();

    // Eyes & Smile
    ctx.fillStyle = '#681B24';
    ctx.beginPath();
    ctx.arc(cx - s * 0.3, cy - s * 0.1, 2.5, 0, Math.PI * 2);
    ctx.arc(cx + s * 0.3, cy - s * 0.1, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#681B24';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    // Blush
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx - s * 0.45, cy, 3, 0, Math.PI * 2);
    ctx.arc(cx + s * 0.45, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

/**
 * Draws a smiling cute sun mascot
 */
export function drawCuteSun(ctx, cx, cy, size) {
    ctx.save();
    ctx.fillStyle = '#FFD166';
    ctx.strokeStyle = '#F48C06';
    ctx.lineWidth = 2;

    // Sun Rays
    const numRays = 8;
    for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2;
        const rx = cx + (size * 0.48) * Math.cos(angle);
        const ry = cy + (size * 0.48) * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(rx, ry, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
    }

    // Core
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.35, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Eyes & Smile
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.arc(cx - size * 0.12, cy - 2, 2.5, 0, Math.PI * 2);
    ctx.arc(cx + size * 0.12, cy - 2, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#333333';
    ctx.beginPath();
    ctx.arc(cx, cy + 2, 4, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    ctx.restore();
}

/**
 * Draws Sigma Mewing & Mogging Icon 🤫🧏‍♂️
 */
export function drawSigmaMewing(ctx, cx, cy, size) {
    ctx.save();
    // Glowing jawline polygon
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2.5;
    ctx.fillStyle = '#1B1B22';
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.4, cy - size * 0.3);
    ctx.lineTo(cx + size * 0.4, cy - size * 0.3);
    ctx.lineTo(cx + size * 0.35, cy + size * 0.1);
    ctx.lineTo(cx, cy + size * 0.45); // sharp jawline
    ctx.lineTo(cx - size * 0.35, cy + size * 0.1);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Sharp Chad sunglasses
    ctx.fillStyle = '#00E5FF';
    ctx.fillRect(cx - size * 0.3, cy - size * 0.15, size * 0.25, size * 0.15);
    ctx.fillRect(cx + size * 0.05, cy - size * 0.15, size * 0.25, size * 0.15);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - size * 0.3, cy - size * 0.15, size * 0.25, size * 0.15);
    ctx.strokeRect(cx + size * 0.05, cy - size * 0.15, size * 0.25, size * 0.15);

    // Shh finger
    ctx.fillStyle = '#FFD166';
    ctx.fillRect(cx - 3, cy + 2, 6, size * 0.3);
    ctx.restore();
}

/**
 * Draws Skibidi Toilet / Cameraman Icon 🚽
 */
export function drawSkibidiIcon(ctx, cx, cy, size) {
    ctx.save();
    // Neon porcelain bowl
    ctx.strokeStyle = '#00F0FF';
    ctx.fillStyle = '#10101E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy + 4, size * 0.35, 0, Math.PI);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Tank
    ctx.fillRect(cx - size * 0.25, cy - size * 0.35, size * 0.5, size * 0.35);
    ctx.strokeRect(cx - size * 0.25, cy - size * 0.35, size * 0.5, size * 0.35);

    // Cyber Eyes
    ctx.fillStyle = '#FF0055';
    ctx.beginPath();
    ctx.arc(cx - 6, cy - size * 0.15, 3, 0, Math.PI * 2);
    ctx.arc(cx + 6, cy - size * 0.15, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

/**
 * Draws Just A Chill Guy 🧢
 */
export function drawChillGuy(ctx, cx, cy, size) {
    ctx.save();
    // Cap
    ctx.fillStyle = '#936639';
    ctx.beginPath();
    ctx.arc(cx, cy - 6, size * 0.32, Math.PI, 0);
    ctx.fill();
    // Visor
    ctx.fillRect(cx - size * 0.45, cy - 8, size * 0.5, 4);

    // Dog / Guy Face
    ctx.fillStyle = '#DDA15E';
    ctx.beginPath();
    ctx.arc(cx, cy + 4, size * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Nose & Smirk
    ctx.fillStyle = '#4A3525';
    ctx.beginPath();
    ctx.arc(cx - 4, cy + 2, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4A3525';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy + 6, 6, 0.1 * Math.PI, 0.7 * Math.PI);
    ctx.stroke();

    // Brown Sweater
    ctx.fillStyle = '#6B4E3D';
    ctx.beginPath();
    ctx.arc(cx, cy + size * 0.45, size * 0.35, Math.PI, 0);
    ctx.fill();
    ctx.restore();
}

/**
 * Draws Unspoken Rizzler Wine & Rose 🍷
 */
export function drawRizzlerGoblet(ctx, cx, cy, size) {
    ctx.save();
    // Goblet
    ctx.strokeStyle = '#FFE6A7';
    ctx.fillStyle = '#780016';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy - 2, size * 0.3, 0, Math.PI);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Stem & Base
    ctx.beginPath();
    ctx.moveTo(cx, cy - 2 + size * 0.3);
    ctx.lineTo(cx, cy + size * 0.38);
    ctx.moveTo(cx - size * 0.2, cy + size * 0.38);
    ctx.lineTo(cx + size * 0.2, cy + size * 0.38);
    ctx.stroke();

    // Sparkles
    drawSparkleStar(ctx, cx + size * 0.35, cy - size * 0.2, 8, '#FFE6A7');
    ctx.restore();
}

/**
 * Draws Grimace Shake 🥤
 */
export function drawGrimaceCup(ctx, cx, cy, size) {
    ctx.save();
    // Purple Cup
    ctx.fillStyle = '#7B2CBF';
    ctx.strokeStyle = '#C77DFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.25, cy - size * 0.1);
    ctx.lineTo(cx + size * 0.25, cy - size * 0.1);
    ctx.lineTo(cx + size * 0.18, cy + size * 0.38);
    ctx.lineTo(cx - size * 0.18, cy + size * 0.38);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Dome lid
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.arc(cx, cy - size * 0.1, size * 0.25, Math.PI, 0);
    ctx.fill();

    // Green Straw
    ctx.strokeStyle = '#70E000';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy - size * 0.1);
    ctx.lineTo(cx + 6, cy - size * 0.38);
    ctx.stroke();
    ctx.restore();
}

/**
 * Draws Capybara with Orange on Head 🦫🍊
 */
export function drawCapybaraMascot(ctx, cx, cy, size) {
    ctx.save();
    // Capybara Body
    ctx.fillStyle = '#936639';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, size * 0.36, size * 0.26, 0, 0, Math.PI * 2);
    ctx.fill();

    // Snoot
    ctx.fillStyle = '#6F4E37';
    ctx.beginPath();
    ctx.arc(cx - size * 0.2, cy + 4, 4, 0, Math.PI * 2);
    ctx.arc(cx - size * 0.2, cy + 7, 4, 0, Math.PI * 2);
    ctx.fill();

    // Chill eye
    ctx.strokeStyle = '#2B1700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx + 2, cy - 1);
    ctx.lineTo(cx + 10, cy - 1);
    ctx.stroke();

    // Orange on head 🍊
    ctx.fillStyle = '#F77F00';
    ctx.beginPath();
    ctx.arc(cx, cy - size * 0.22, size * 0.14, 0, Math.PI * 2);
    ctx.fill();
    // Leaf
    ctx.fillStyle = '#55A630';
    ctx.beginPath();
    ctx.ellipse(cx + 4, cy - size * 0.32, 4, 2, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

/**
 * Draws High Aura Flame Burst 🔥💥
 */
export function drawAuraFlame(ctx, cx, cy, size) {
    ctx.save();
    // Flame outer
    ctx.fillStyle = '#FF0033';
    ctx.beginPath();
    ctx.moveTo(cx, cy - size * 0.4);
    ctx.quadraticCurveTo(cx + size * 0.35, cy - size * 0.1, cx + size * 0.25, cy + size * 0.35);
    ctx.quadraticCurveTo(cx, cy + size * 0.45, cx - size * 0.25, cy + size * 0.35);
    ctx.quadraticCurveTo(cx - size * 0.35, cy - size * 0.1, cx, cy - size * 0.4);
    ctx.fill();

    // Flame inner Lime Glow
    ctx.fillStyle = '#CCFF00';
    ctx.beginPath();
    ctx.arc(cx, cy + 4, size * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

/**
 * Draws Retro Snapshot Vector Camera 📷
 */
export function drawVectorCamera(ctx, size = 30, color = '#173F30') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    drawRoundedRect(ctx, 40, 24, size * 1.3, size * 0.9, 4);
    ctx.fill();
    // Lens
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(40 + (size * 1.3) / 2, 24 + (size * 0.9) / 2, size * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#141414';
    ctx.beginPath();
    ctx.arc(40 + (size * 1.3) / 2, 24 + (size * 0.9) / 2, size * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

/**
 * Draws translucent washi tape sticker across a corner
 */
export function drawWashiTape(ctx, x, y, w, h, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.82;
    ctx.fillRect(-w / 2, -h / 2, w, h);

    // Jagged tape edges
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(-w / 2, -h / 2, w, h);
    ctx.restore();
}

/**
 * Calculates canvas dimensions based on layout, shot count, and style theme.
 */
export function getLayoutDimensions(shotCount = 4, layoutId = '4-cut', styleType = 'classic_clean') {
    const W = 640;
    const count = shotCount || 4;

    // Red Spartan Scalloped Oval has exact 1:1 reference proportions
    if (styleType === 'scallop_oval') {
        const GAP = 68; // Clean space between ovals
        const headerH = 44;
        const footerH = 150;
        const photoW = 550; // Exact width from reference
        const photoH = 730; // Exact height from reference (1.33:1 ratio)
        const PAD = Math.round((W - photoW) / 2); // 45px
        const H = headerH + count * photoH + (count - 1) * GAP + footerH;
        return { W, H, PAD, GAP, headerH, footerH, photoW, photoH, isGrid: false, isOval: true };
    }

    if (layoutId === '2x2') {
        const PAD = 28;
        const GAP = 12;
        const headerH = 80;
        const footerH = 72;
        const photoW = Math.round((W - PAD * 2 - GAP) / 2);
        const photoH = Math.round(photoW * 3 / 4);
        const H = headerH + 2 * photoH + GAP + footerH + PAD;
        return { W, H, PAD, GAP, headerH, footerH, photoW, photoH, isGrid: true, isOval: false };
    }

    const PAD = 28;
    const GAP = 12;
    const headerH = 88;
    const footerH = 72;
    const photoW = W - PAD * 2;                 // 584
    const photoH = Math.round(photoW * 9 / 16); // 329
    const H = headerH + count * photoH + (count - 1) * GAP + footerH + PAD;
    return { W, H, PAD, GAP, headerH, footerH, photoW, photoH, isGrid: false, isOval: false };
}

/**
 * Renders photos onto the Photo Strip canvas in high resolution.
 */
export async function renderPhotoStrip(canvas, shots, selectedFrame = 'klique_scallop', selectedFilter = 'normal', logoImg = null, layoutId = '4-cut', stickers = []) {
    if (!canvas || !shots || shots.length === 0) return;
    const theme = THEME[selectedFrame] || THEME.klique_scallop;
    const styleType = theme.styleType || 'classic_clean';

    const dims = getLayoutDimensions(shots.length, layoutId, styleType);
    const { W, H, PAD, GAP, headerH, footerH, photoW, photoH, isGrid, isOval } = dims;

    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // 1. Background
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, W, H);

    // 2. Preload photos
    const loadedImages = await Promise.all(shots.map(src => new Promise(res => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = () => res(null);
        img.src = src;
    })));

    // ── THEME-SPECIFIC RENDERING ─────────────────────────────────────────────

    if (styleType === 'scallop_oval') {
        // ====================================================================
        // RED SPARTAN VINTAGE SCALLOPED PORTRAIT OVAL (Exact 1:1 Reference!)
        // ====================================================================
        loadedImages.forEach((img, i) => {
            const cx = W / 2;
            const cy = headerH + i * (photoH + GAP) + photoH / 2;
            const rx = photoW / 2; // 275
            const ry = photoH / 2; // 365
            const numScallops = 32;
            const scallopRadius = 18;
            const stripeThickness = 22;

            // A. Draw outer scalloped lace petals
            ctx.save();
            ctx.fillStyle = '#681B24';
            for (let s = 0; s < numScallops; s++) {
                const angle = (s / numScallops) * Math.PI * 2;
                const px = cx + (rx + 8) * Math.cos(angle);
                const py = cy + (ry + 8) * Math.sin(angle);
                ctx.beginPath();
                ctx.arc(px, py, scallopRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Inner cream dots/petals for delicate lace look
            ctx.fillStyle = '#FBF6EB';
            for (let s = 0; s < numScallops; s++) {
                const angle = (s / numScallops) * Math.PI * 2;
                const px = cx + (rx + 8) * Math.cos(angle);
                const py = cy + (ry + 8) * Math.sin(angle);
                ctx.beginPath();
                ctx.arc(px, py, scallopRadius - 4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();

            // B. Draw Candy-Cane Parallel Vertical Striped Oval Ring
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            ctx.clip();

            // Base cream fill
            ctx.fillStyle = '#FBF6EB';
            ctx.fillRect(cx - rx - 20, cy - ry - 20, (rx + 20) * 2, (ry + 20) * 2);

            // Parallel vertical burgundy stripes (like candy cane / reference photo)
            const stripeW = 14;
            ctx.fillStyle = '#681B24';
            for (let sx = cx - rx - 30; sx < cx + rx + 30; sx += stripeW * 2) {
                ctx.fillRect(sx, cy - ry - 30, stripeW, (ry + 30) * 2);
            }
            ctx.restore();

            // C. Draw Inner Oval Photo
            const innerRx = rx - stripeThickness;
            const innerRy = ry - stripeThickness;

            // Thin border line around inner cutout
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(cx, cy, innerRx + 1, innerRy + 1, 0, 0, Math.PI * 2);
            ctx.strokeStyle = '#681B24';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Photo Clipping
            ctx.beginPath();
            ctx.ellipse(cx, cy, innerRx, innerRy, 0, 0, Math.PI * 2);
            ctx.clip();

            if (img) {
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                const iw = img.naturalWidth || 960;
                const ih = img.naturalHeight || 540;
                const targetW = innerRx * 2;
                const targetH = innerRy * 2;
                const scale = Math.max(targetW / iw, targetH / ih);
                const sw = iw * scale;
                const sh = ih * scale;
                ctx.drawImage(img, cx - sw / 2, cy - sh / 2, sw, sh);
            } else {
                ctx.fillStyle = '#681B24';
                ctx.fillRect(cx - innerRx, cy - innerRy, innerRx * 2, innerRy * 2);
            }
            ctx.restore();
        });

        // Vintage Signature Typography at Bottom: "Red Spartan"
        const fy = H - footerH;
        ctx.save();
        ctx.fillStyle = '#681B24';
        ctx.textAlign = 'center';
        ctx.font = 'italic 800 42px "Playfair Display", Georgia, serif';
        ctx.fillText('Red Spartan', W / 2, fy + 65);

        // Sparkle stars around signature
        drawSparkleStar(ctx, W / 2 + 145, fy + 52, 13, '#681B24');
        drawSparkleStar(ctx, W / 2 - 145, fy + 52, 13, '#681B24');

        ctx.font = '700 11px "Space Mono", monospace';
        ctx.letterSpacing = '3px';
        ctx.globalAlpha = 0.8;
        ctx.fillText('✦ TECH IS · VINTAGE SOUVENIR · 2026 ✦', W / 2, fy + 98);
        ctx.restore();

    } else if (styleType.startsWith('climate_t')) {
        // ====================================================================
        // 🌿 TECH IS — CLIMATE ACTION & PASTEL AESTHETIC SERIES (TEMPLATES 1-8)
        // ====================================================================
        const tNum = parseInt(styleType.replace('climate_t', ''), 10) || 1;

        // Common Header: "TECH IS" + "CLIMATE ACTION"
        ctx.save();
        ctx.textAlign = 'center';

        if (tNum === 1) { // Think Green Sage
            ctx.fillStyle = '#1B4332';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 40);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.letterSpacing = '1px';
            ctx.fillText('CLIMATE ACTION · PROTECT EARTH', W / 2, 60);
        } else if (tNum === 2) { // Matcha Bear
            ctx.fillStyle = '#2D5A27';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 40);
            drawCuteBear(ctx, W - 50, 42, 28);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillText('CLIMATE ACTION', W / 2, 60);
        } else if (tNum === 3) { // Lavender Heal
            drawWashiTape(ctx, 36, 12, 46, 16, -14, '#CDB4DB');
            drawCuteRainbow(ctx, W - 55, 45, 22);
            ctx.fillStyle = '#5E4B8B';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 40);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillText('♡ CLIMATE ACTION ♡', W / 2, 60);
        } else if (tNum === 4) { // Vintage Kraft
            drawVectorCamera(ctx, 28, '#8C6239');
            ctx.fillStyle = '#4A3525';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 40);
            ctx.font = '800 10.5px "Space Mono", monospace';
            ctx.fillText('CLIMATE ACTION · PROTECT OUR FUTURE', W / 2, 60);
        } else if (tNum === 5) { // Strawberry Pink
            drawWashiTape(ctx, W - 60, 12, 48, 16, 15, '#FFCCD5');
            ctx.fillStyle = '#C9184A';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 40);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillText('CLIMATE ACTION', W / 2, 60);
        } else if (tNum === 6) { // Sky Cloud & Sunshine
            drawCuteSun(ctx, W - 48, 38, 28);
            ctx.fillStyle = '#0369A1';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 40);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillText('CLIMATE ACTION', W / 2, 60);
        } else if (tNum === 7) { // Blue Gingham
            drawWashiTape(ctx, W - 55, 14, 46, 16, 18, '#90E0EF');
            ctx.fillStyle = '#1E3A8A';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 40);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillText('— CLIMATE ACTION —', W / 2, 60);
        } else { // Lilac Care
            drawWashiTape(ctx, 38, 14, 44, 16, -15, '#D8B4E2');
            ctx.fillStyle = '#6B21A8';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 40);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillText('CLIMATE ACTION', W / 2, 60);
        }
        ctx.restore();

        // Photos Rendering + Cute Number Tags
        loadedImages.forEach((img, i) => {
            let px = PAD;
            let py = headerH + i * (photoH + GAP);

            if (isGrid) {
                const col = i % 2;
                const row = Math.floor(i / 2);
                px = PAD + col * (photoW + GAP);
                py = headerH + row * (photoH + GAP);
            }

            if (img) {
                ctx.save();
                drawRoundedRect(ctx, px, py, photoW, photoH, 8);
                ctx.clip();
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                ctx.drawImage(img, px, py, photoW, photoH);
                ctx.restore();
            }

            // Frame border
            ctx.strokeStyle = theme.line || '#333333';
            ctx.lineWidth = 2.5;
            drawRoundedRect(ctx, px, py, photoW, photoH, 8);
            ctx.stroke();

            // Number tag badge in top-left corner
            ctx.save();
            ctx.fillStyle = theme.accentColor || theme.line;
            drawRoundedRect(ctx, px + 6, py + 6, 20, 20, 5);
            ctx.fill();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '800 11px Archivo, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(i + 1), px + 16, py + 16);
            ctx.restore();
        });

        // Footers with Cute Badges & Earth Mascots
        const fy = H - footerH;
        ctx.save();

        if (tNum === 1) { // Think Green Live Clean
            drawCuteEarth(ctx, W - 80, fy + 54, 30);
            ctx.fillStyle = '#FFFFFF';
            drawRoundedRect(ctx, 36, fy + 32, W - 140, 44, 8);
            ctx.fill();
            ctx.strokeStyle = '#1B4332';
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, 36, fy + 32, W - 140, 44, 8);
            ctx.stroke();
            ctx.fillStyle = '#1B4332';
            ctx.font = '900 15px Archivo, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('THINK GREEN', 36 + (W - 140) / 2, fy + 48);
            ctx.font = '700 11px "Space Mono", monospace';
            ctx.fillText('LIVE CLEAN ✦', 36 + (W - 140) / 2, fy + 66);

        } else if (tNum === 2) { // Small Actions Big Impact
            drawCuteBear(ctx, 70, fy + 52, 42);
            drawCuteEarth(ctx, W - 65, fy + 52, 26);
            ctx.fillStyle = '#FFFDF5';
            drawRoundedRect(ctx, 116, fy + 32, W - 200, 42, 8);
            ctx.fill();
            ctx.strokeStyle = '#2D5A27';
            ctx.lineWidth = 1.8;
            drawRoundedRect(ctx, 116, fy + 32, W - 200, 42, 8);
            ctx.stroke();
            ctx.fillStyle = '#2D5A27';
            ctx.font = '800 12px Archivo, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('SMALL ACTIONS', 116 + (W - 200) / 2, fy + 48);
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillText('BIG IMPACT ♡', 116 + (W - 200) / 2, fy + 64);

        } else if (tNum === 3) { // Let's Heal Our Planet
            drawCuteEarth(ctx, W - 75, fy + 54, 30);
            ctx.fillStyle = '#FFFFFF';
            drawRoundedRect(ctx, 40, fy + 32, W - 135, 42, 8);
            ctx.fill();
            ctx.strokeStyle = '#5E4B8B';
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, 40, fy + 32, W - 135, 42, 8);
            ctx.stroke();
            ctx.fillStyle = '#5E4B8B';
            ctx.font = '800 12px Archivo, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('LET\'S HEAL', 40 + (W - 135) / 2, fy + 48);
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillText('OUR PLANET ✦', 40 + (W - 135) / 2, fy + 64);

        } else if (tNum === 4) { // Be The Change
            drawCuteEarth(ctx, W - 75, fy + 54, 28);
            ctx.fillStyle = '#FFF9F0';
            drawRoundedRect(ctx, 40, fy + 32, W - 135, 44, 6);
            ctx.fill();
            ctx.strokeStyle = '#4A3525';
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, 40, fy + 32, W - 135, 44, 6);
            ctx.stroke();
            ctx.fillStyle = '#4A3525';
            ctx.font = '800 12px Archivo, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('BE THE CHANGE', 40 + (W - 135) / 2, fy + 48);
            ctx.font = '700 9.5px "Space Mono", monospace';
            ctx.fillText('NOT THE CAUSE ✦', 40 + (W - 135) / 2, fy + 65);

        } else if (tNum === 5) { // Save Today Save Tomorrow
            drawCuteSmileyHeart(ctx, W - 70, fy + 52, 42, '#FF758F');
            ctx.fillStyle = '#FFFFFF';
            drawRoundedRect(ctx, 40, fy + 32, W - 135, 42, 8);
            ctx.fill();
            ctx.strokeStyle = '#C9184A';
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, 40, fy + 32, W - 135, 42, 8);
            ctx.stroke();
            ctx.fillStyle = '#C9184A';
            ctx.font = '800 12px Archivo, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('SAVE TODAY', 40 + (W - 135) / 2, fy + 48);
            ctx.font = '700 9.5px "Space Mono", monospace';
            ctx.fillText('SAVE TOMORROW ♡', 40 + (W - 135) / 2, fy + 64);

        } else if (tNum === 6) { // One Planet One Future
            drawCuteEarth(ctx, W - 75, fy + 52, 28);
            ctx.fillStyle = '#FFF8E7';
            drawRoundedRect(ctx, 36, fy + 30, W - 130, 46, 6);
            ctx.fill();
            ctx.strokeStyle = '#0369A1';
            ctx.lineWidth = 1.8;
            drawRoundedRect(ctx, 36, fy + 30, W - 130, 46, 6);
            ctx.stroke();
            ctx.fillStyle = '#0369A1';
            ctx.font = '800 11px Archivo, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('ONE PLANET · ONE FUTURE', 36 + (W - 130) / 2, fy + 48);
            ctx.font = '700 9px "Space Mono", monospace';
            ctx.fillText('ONE CHANCE ✦', 36 + (W - 130) / 2, fy + 65);

        } else if (tNum === 7) { // Good Planet Good Life
            drawCuteEarth(ctx, W - 75, fy + 54, 28);
            ctx.fillStyle = '#FFFFFF';
            drawRoundedRect(ctx, 40, fy + 32, W - 135, 42, 6);
            ctx.fill();
            ctx.strokeStyle = '#1E3A8A';
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, 40, fy + 32, W - 135, 42, 6);
            ctx.stroke();
            ctx.fillStyle = '#1E3A8A';
            ctx.font = '800 12px Archivo, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('GOOD PLANET', 40 + (W - 135) / 2, fy + 48);
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillText('GOOD LIFE ♡', 40 + (W - 135) / 2, fy + 64);

        } else { // Care Today Thrive Tomorrow
            drawCuteEarth(ctx, W - 75, fy + 54, 28);
            ctx.fillStyle = '#FFFFFF';
            drawRoundedRect(ctx, 40, fy + 32, W - 135, 42, 6);
            ctx.fill();
            ctx.strokeStyle = '#6B21A8';
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, 40, fy + 32, W - 135, 42, 6);
            ctx.stroke();
            ctx.fillStyle = '#6B21A8';
            ctx.font = '800 12px Archivo, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('CARE TODAY', 40 + (W - 135) / 2, fy + 48);
            ctx.font = '700 9.5px "Space Mono", monospace';
            ctx.fillText('THRIVE TOMORROW ♡', 40 + (W - 135) / 2, fy + 64);
        }

        ctx.restore();

    } else if (styleType.startsWith('brainrot_')) {
        // ====================================================================
        // 🧠 TECH IS — VIRAL BRAINROT & GEN-Z MEME SERIES
        // ====================================================================
        ctx.save();
        ctx.textAlign = 'center';

        if (styleType === 'brainrot_sigma') { // Sigma Mewing 🤫🧏‍♂️
            drawSigmaMewing(ctx, W - 46, 38, 32);
            drawSparkleStar(ctx, 42, 38, 12, '#FFD700');
            ctx.fillStyle = '#FFD700';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 38);
            ctx.font = '800 11.5px "Space Mono", monospace';
            ctx.fillStyle = '#00E5FF';
            ctx.fillText('🤫🧏‍♂️ BYE BYE · MEWING ARCHIVE', W / 2, 58);

        } else if (styleType === 'brainrot_skibidi') { // Skibidi Toilet
            drawSkibidiIcon(ctx, W - 46, 38, 30);
            drawSkibidiIcon(ctx, 46, 38, 30);
            ctx.fillStyle = '#00F0FF';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 38);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillStyle = '#FF0055';
            ctx.fillText('🚽 SKIBIDI RIZZ DOP DOP 🚽', W / 2, 58);

        } else if (styleType === 'brainrot_chill') { // Just A Chill Guy
            drawChillGuy(ctx, W - 48, 38, 30);
            ctx.fillStyle = '#4A3525';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 38);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillStyle = '#8C6239';
            ctx.fillText('🧢 JUST A CHILL GUY ☕', W / 2, 58);

        } else if (styleType === 'brainrot_rizzler') { // Unspoken Rizz
            drawRizzlerGoblet(ctx, W - 48, 38, 30);
            ctx.fillStyle = '#FFE6A7';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 38);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillStyle = '#FF4D6D';
            ctx.fillText('🍷 UNSPOKEN W RIZZ ✦', W / 2, 58);

        } else if (styleType === 'brainrot_grimace') { // Grimace Shake
            drawGrimaceCup(ctx, W - 46, 38, 30);
            ctx.fillStyle = '#E0AAFF';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 38);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillStyle = '#70E000';
            ctx.fillText('👾 LEVEL 100 GYATT ⚡', W / 2, 58);

        } else if (styleType === 'brainrot_capybara') { // Ok I Pull Up
            drawCapybaraMascot(ctx, W - 48, 38, 32);
            ctx.fillStyle = '#7F4F24';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 38);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillStyle = '#F77F00';
            ctx.fillText('🦫 OK I PULL UP · COCONUT DOG 🍊', W / 2, 58);

        } else { // Tung Tung / Aura Flame
            drawAuraFlame(ctx, W - 46, 38, 30);
            drawAuraFlame(ctx, 46, 38, 30);
            ctx.fillStyle = '#CCFF00';
            ctx.font = '900 28px Archivo, sans-serif';
            ctx.fillText('TECH IS', W / 2, 38);
            ctx.font = '800 11px "Space Mono", monospace';
            ctx.fillStyle = '#FF0033';
            ctx.fillText('💥 1,000,000 AURA · WHAT DA HELL 💥', W / 2, 58);
        }
        ctx.restore();

        // Photos Rendering
        loadedImages.forEach((img, i) => {
            let px = PAD;
            let py = headerH + i * (photoH + GAP);

            if (isGrid) {
                const col = i % 2;
                const row = Math.floor(i / 2);
                px = PAD + col * (photoW + GAP);
                py = headerH + row * (photoH + GAP);
            }

            if (img) {
                ctx.save();
                drawRoundedRect(ctx, px, py, photoW, photoH, 8);
                ctx.clip();
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                ctx.drawImage(img, px, py, photoW, photoH);
                ctx.restore();
            }

            // High aesthetic borders
            ctx.strokeStyle = theme.line || '#FFD700';
            ctx.lineWidth = 2.8;
            drawRoundedRect(ctx, px, py, photoW, photoH, 8);
            ctx.stroke();

            // Brainrot Corner Meme Badge
            ctx.save();
            ctx.fillStyle = theme.accentColor || '#00E5FF';
            drawRoundedRect(ctx, px + 6, py + 6, 26, 20, 5);
            ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.font = '900 10px Archivo, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const memeTags = ['#1', 'MOG', 'RIZZ', 'AURA'];
            ctx.fillText(memeTags[i % memeTags.length], px + 19, py + 16);
            ctx.restore();
        });

        // Footers with Memes & Watermark
        const fy = H - footerH;
        ctx.save();
        ctx.textAlign = 'center';

        if (styleType === 'brainrot_sigma') {
            drawSigmaMewing(ctx, W / 2, fy + 44, 38);
            ctx.fillStyle = '#FFD700';
            ctx.font = '900 15px Archivo, sans-serif';
            ctx.fillText('BYE BYE 🤫🧏‍♂️ · 10,000+ AURA', W / 2, fy + 78);
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillStyle = '#00E5FF';
            ctx.fillText('TECH IS · SIGMA ARCHIVE · 2026', W / 2, fy + 94);

        } else if (styleType === 'brainrot_skibidi') {
            drawSkibidiIcon(ctx, W / 2, fy + 42, 38);
            ctx.fillStyle = '#00F0FF';
            ctx.font = '900 15px Archivo, sans-serif';
            ctx.fillText('SKIBIDI DOP DOP YES YES', W / 2, fy + 78);
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillStyle = '#FF0055';
            ctx.fillText('TECH IS · BRAINROT EDITION · 2026', W / 2, fy + 94);

        } else if (styleType === 'brainrot_chill') {
            drawChillGuy(ctx, W / 2, fy + 42, 38);
            ctx.fillStyle = '#4A3525';
            ctx.font = '900 15px Archivo, sans-serif';
            ctx.fillText('JUST A CHILL GUY AT TECH IS', W / 2, fy + 78);
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillStyle = '#8C6239';
            ctx.fillText('☕ UNBOTHERED · FULLY RELAXED · 2026', W / 2, fy + 94);

        } else if (styleType === 'brainrot_rizzler') {
            drawRizzlerGoblet(ctx, W / 2, fy + 42, 38);
            ctx.fillStyle = '#FFE6A7';
            ctx.font = '900 15px Archivo, sans-serif';
            ctx.fillText('UNSPOKEN RIZZ · W RIZZ ONLY', W / 2, fy + 78);
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillStyle = '#FF4D6D';
            ctx.fillText('TECH IS · NO CAP · 2026 ✦', W / 2, fy + 94);

        } else if (styleType === 'brainrot_grimace') {
            drawGrimaceCup(ctx, W / 2, fy + 42, 38);
            ctx.fillStyle = '#E0AAFF';
            ctx.font = '900 15px Archivo, sans-serif';
            ctx.fillText('LEVEL 100 GYATT · GRIMACE SHAKE', W / 2, fy + 78);
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillStyle = '#70E000';
            ctx.fillText('⚡ TECH IS · CHAOS CERTIFIED · 2026 ⚡', W / 2, fy + 94);

        } else if (styleType === 'brainrot_capybara') {
            drawCapybaraMascot(ctx, W / 2, fy + 42, 40);
            ctx.fillStyle = '#7F4F24';
            ctx.font = '900 14px Archivo, sans-serif';
            ctx.fillText('OK I PULL UP 🦫 COCONUT DOG', W / 2, fy + 78);
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillStyle = '#F77F00';
            ctx.fillText('🍊 HOP OUT AT THE AFTER PARTY ✦', W / 2, fy + 94);

        } else {
            drawAuraFlame(ctx, W / 2, fy + 42, 38);
            ctx.fillStyle = '#CCFF00';
            ctx.font = '900 15px Archivo, sans-serif';
            ctx.fillText('💥 WHAT DA HEELL · 1,000,000 AURA 💥', W / 2, fy + 78);
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.fillStyle = '#FF0033';
            ctx.fillText('TECH IS · ULTIMATE BRAINROT · 2026', W / 2, fy + 94);
        }
        ctx.restore();

    } else if (styleType === 'film_35mm') {
        // ====================================================================
        // 35MM KODAK FILMSTRIP ARCHIVE
        // ====================================================================
        // Draw real sprocket holes along left and right borders
        const holeW = 12, holeH = 18, holeGap = 28;
        ctx.fillStyle = '#FFFFFF';
        for (let y = 14; y < H - 14; y += holeGap) {
            drawRoundedRect(ctx, 8, y, holeW, holeH, 3);
            ctx.fill();
            drawRoundedRect(ctx, W - 8 - holeW, y, holeW, holeH, 3);
            ctx.fill();
        }

        // Draw photos with film frame borders
        loadedImages.forEach((img, i) => {
            const py = headerH + i * (photoH + GAP);
            const px = PAD + 10;
            const pw = photoW - 20;

            if (img) {
                ctx.save();
                drawRoundedRect(ctx, px, py, pw, photoH, 4);
                ctx.clip();
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                ctx.drawImage(img, px, py, pw, photoH);
                ctx.restore();
            }

            ctx.strokeStyle = '#282828';
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, px, py, pw, photoH, 4);
            ctx.stroke();

            // Film frame stamp
            ctx.fillStyle = '#F4B41A';
            ctx.font = '700 9px "Space Mono", monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`▶ ${24 + i}A  ·  TECH IS KODAK 400`, px + 6, py - 3);
        });

        // Film Header & Footer
        ctx.fillStyle = '#F4B41A';
        ctx.textAlign = 'center';
        ctx.font = '800 20px Archivo, sans-serif';
        ctx.fillText('TECH IS · KODAK PORTRA 400', W / 2, 42);
        ctx.font = '700 10px "Space Mono", monospace';
        ctx.globalAlpha = 0.8;
        ctx.fillText('TECH IS SOUVENIR · ISO 400 · PROCESS C-41', W / 2, 60);
        ctx.globalAlpha = 1;

        const fy = H - footerH;
        ctx.fillText('EXP 24 · TECH IS 35MM ARCHIVE · 2026', W / 2, fy + 40);

    } else if (styleType === 'spartan_crimson') {
        // ====================================================================
        // RED SPARTAN VARSITY / LUXURY CRIMSON & GOLD
        // ====================================================================
        // Header
        ctx.fillStyle = '#F4B41A';
        ctx.textAlign = 'center';
        ctx.font = '800 24px Archivo, sans-serif';
        ctx.fillText('TECH IS · RED SPARTAN', W / 2, 42);
        ctx.font = '700 10.5px "Space Mono", monospace';
        ctx.letterSpacing = '3px';
        ctx.fillText('✦ TECH IS · BATSTATE-U · LEAD THE WAY · 2026 ✦', W / 2, 62);

        loadedImages.forEach((img, i) => {
            let px = PAD;
            let py = headerH + i * (photoH + GAP);

            if (isGrid) {
                const col = i % 2;
                const row = Math.floor(i / 2);
                px = PAD + col * (photoW + GAP);
                py = headerH + row * (photoH + GAP);
            }

            if (img) {
                ctx.save();
                drawRoundedRect(ctx, px, py, photoW, photoH, 8);
                ctx.clip();
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                ctx.drawImage(img, px, py, photoW, photoH);
                ctx.restore();
            }

            // Double Gold & Red Trim
            ctx.strokeStyle = '#F4B41A';
            ctx.lineWidth = 3;
            drawRoundedRect(ctx, px, py, photoW, photoH, 8);
            ctx.stroke();

            ctx.strokeStyle = '#681B24';
            ctx.lineWidth = 1.5;
            drawRoundedRect(ctx, px + 4, py + 4, photoW - 8, photoH - 8, 6);
            ctx.stroke();

            // Corner gold stars
            drawSparkleStar(ctx, px + 10, py + 10, 8, '#F4B41A');
            drawSparkleStar(ctx, px + photoW - 10, py + 10, 8, '#F4B41A');
            drawSparkleStar(ctx, px + 10, py + photoH - 10, 8, '#F4B41A');
            drawSparkleStar(ctx, px + photoW - 10, py + photoH - 10, 8, '#F4B41A');
        });

        // Footer
        const fy = H - footerH;
        ctx.save();
        ctx.fillStyle = '#F4B41A';
        ctx.textAlign = 'center';
        ctx.font = 'italic 800 36px "Playfair Display", Georgia, serif';
        ctx.fillText('Red Spartan', W / 2, fy + 48);

        drawSparkleStar(ctx, W / 2 + 130, fy + 38, 12, '#F4B41A');
        drawSparkleStar(ctx, W / 2 - 130, fy + 38, 12, '#F4B41A');

        ctx.font = '700 10px "Space Mono", monospace';
        ctx.letterSpacing = '2px';
        ctx.fillText('✦ TECH IS OFFICIAL PHOTO BOOTH · 2026 ✦', W / 2, fy + 78);
        ctx.restore();

    } else if (styleType === 'cherry_velvet') {
        // ====================================================================
        // CHERRY RED VELVET & SWEET PEARL BOWS
        // ====================================================================
        // Header
        ctx.fillStyle = '#FFF0F3';
        ctx.textAlign = 'center';
        ctx.font = 'italic 700 28px "Playfair Display", Georgia, serif';
        ctx.fillText('Tech IS · Cherry Memories', W / 2, 46);
        ctx.font = '700 10.5px "Space Mono", monospace';
        ctx.fillText('♡ TECH IS · FRENCH CHERRY RED EDITION ♡', W / 2, 66);

        loadedImages.forEach((img, i) => {
            let px = PAD;
            let py = headerH + i * (photoH + GAP);

            if (isGrid) {
                const col = i % 2;
                const row = Math.floor(i / 2);
                px = PAD + col * (photoW + GAP);
                py = headerH + row * (photoH + GAP);
            }

            if (img) {
                ctx.save();
                drawRoundedRect(ctx, px, py, photoW, photoH, 10);
                ctx.clip();
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                ctx.drawImage(img, px, py, photoW, photoH);
                ctx.restore();
            }

            // White / Pink Border
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 3;
            drawRoundedRect(ctx, px, py, photoW, photoH, 10);
            ctx.stroke();

            // Ribbon Bow on top
            drawSatinBow(ctx, px + photoW / 2, py, 18, '#FFCCD5');
            // Little cherries in bottom corner
            drawVectorCherry(ctx, 32, '#D90429');
        });

        // Footer
        const fy = H - footerH;
        ctx.fillStyle = '#FFF0F3';
        ctx.textAlign = 'center';
        ctx.font = 'italic 700 24px "Playfair Display", serif';
        ctx.fillText('Sweetest Moments', W / 2, fy + 40);
        ctx.font = '700 10px "Space Mono", monospace';
        ctx.fillText('♡ TECH IS CHERRY VELVET ARCHIVE · 2026 ♡', W / 2, fy + 64);

    } else if (styleType === 'cyber_scarlet') {
        // ====================================================================
        // SCARLET Y2K CYBER RED & CHROME STARS
        // ====================================================================
        // Header
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.font = '900 26px Archivo, sans-serif';
        ctx.fillText('// TECH IS · SCARLET VAULT //', W / 2, 46);
        ctx.font = '700 10.5px "Space Mono", monospace';
        ctx.fillText('★ TECH IS · Y2K CYBER RED EDITION · 2026 ★', W / 2, 66);

        loadedImages.forEach((img, i) => {
            let px = PAD;
            let py = headerH + i * (photoH + GAP);

            if (isGrid) {
                const col = i % 2;
                const row = Math.floor(i / 2);
                px = PAD + col * (photoW + GAP);
                py = headerH + row * (photoH + GAP);
            }

            if (img) {
                ctx.save();
                drawRoundedRect(ctx, px, py, photoW, photoH, 6);
                ctx.clip();
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                ctx.drawImage(img, px, py, photoW, photoH);
                ctx.restore();
            }

            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 3;
            drawRoundedRect(ctx, px, py, photoW, photoH, 6);
            ctx.stroke();

            // Cyber Chrome stars on top-right and bottom-left
            drawSparkleStar(ctx, px + photoW - 12, py + 12, 11, '#FFD166');
            drawSparkleStar(ctx, px + 12, py + photoH - 12, 11, '#FFD166');
        });

        // Footer
        const fy = H - footerH;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.font = '800 22px Archivo, sans-serif';
        ctx.fillText('★ TECH IS · SCARLET SPEED & GLORY ★', W / 2, fy + 42);

    } else if (styleType === 'coquette') {
        // ====================================================================
        // COQUETTE PASTEL & SATIN BOWS
        // ====================================================================
        loadedImages.forEach((img, i) => {
            const py = headerH + i * (photoH + GAP);
            if (img) {
                ctx.save();
                drawRoundedRect(ctx, PAD, py, photoW, photoH, 12);
                ctx.clip();
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                ctx.drawImage(img, PAD, py, photoW, photoH);
                ctx.restore();
            }

            ctx.strokeStyle = '#FFCCD5';
            ctx.lineWidth = 3;
            drawRoundedRect(ctx, PAD, py, photoW, photoH, 12);
            ctx.stroke();

            // Cute bow ribbon on top center of each photo!
            drawSatinBow(ctx, W / 2, py, 18, '#FF758F');
        });

        // Coquette Header & Footer
        ctx.fillStyle = '#C9184A';
        ctx.textAlign = 'center';
        ctx.font = 'italic 700 28px "Playfair Display", Georgia, serif';
        ctx.fillText('Tech IS · Cherished Moments', W / 2, 48);
        ctx.font = '700 11px "Space Mono", monospace';
        ctx.fillText('♡ TECH IS · SWEET EDITION PHOTO BOOTH ♡', W / 2, 68);

        const fy = H - footerH;
        ctx.font = 'italic 700 22px "Playfair Display", serif';
        ctx.fillText('Forever & Always', W / 2, fy + 36);
        ctx.font = '700 10px "Space Mono", monospace';
        ctx.fillText('♡ TECH IS · 2026 PHOTO ARCHIVE ♡', W / 2, fy + 56);

    } else if (styleType === 'y2k_stars') {
        // ====================================================================
        // Y2K CYBER CHROME & SPARKLE STARS
        // ====================================================================
        loadedImages.forEach((img, i) => {
            const py = headerH + i * (photoH + GAP);
            if (img) {
                ctx.save();
                drawRoundedRect(ctx, PAD, py, photoW, photoH, 8);
                ctx.clip();
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                ctx.drawImage(img, PAD, py, photoW, photoH);
                ctx.restore();
            }

            ctx.strokeStyle = '#6C4AB6';
            ctx.lineWidth = 2.5;
            drawRoundedRect(ctx, PAD, py, photoW, photoH, 8);
            ctx.stroke();

            // Cyber Sparkle stars in corners
            drawSparkleStar(ctx, PAD + 8, py + 8, 10, '#E5D4FF');
            drawSparkleStar(ctx, PAD + photoW - 8, py + photoH - 8, 10, '#E5D4FF');
        });

        // Cyber Header & Footer
        ctx.fillStyle = '#E5D4FF';
        ctx.textAlign = 'center';
        ctx.font = '800 24px Archivo, sans-serif';
        ctx.fillText('// TECH IS · CYBER VAULT //', W / 2, 46);
        ctx.font = '700 10px "Space Mono", monospace';
        ctx.fillText('✦ TECH IS DIGITAL STAR STREAM · 2026 ✦', W / 2, 66);

        const fy = H - footerH;
        ctx.fillText('★ TECH IS · 2026 VAPOR EDITION ★', W / 2, fy + 40);

    } else if (styleType === 'washi_tape') {
        // ====================================================================
        // KOREAN PHOTOMATON & WASHI TAPES
        // ====================================================================
        const tapeColors = ['rgba(255, 179, 186, 0.85)', 'rgba(186, 225, 255, 0.85)', 'rgba(255, 255, 186, 0.85)', 'rgba(186, 255, 201, 0.85)'];
        loadedImages.forEach((img, i) => {
            const py = headerH + i * (photoH + GAP);
            if (img) {
                ctx.save();
                drawRoundedRect(ctx, PAD, py, photoW, photoH, 4);
                ctx.clip();
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                ctx.drawImage(img, PAD, py, photoW, photoH);
                ctx.restore();
            }

            ctx.strokeStyle = '#E0DDD5';
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, PAD, py, photoW, photoH, 4);
            ctx.stroke();

            // Washi tape on corners
            drawWashiTape(ctx, PAD + 18, py + 2, 38, 14, -18, tapeColors[i % tapeColors.length]);
            drawWashiTape(ctx, PAD + photoW - 18, py + photoH - 2, 38, 14, -18, tapeColors[(i + 1) % tapeColors.length]);
        });

        // Korean Minimal Header & Footer
        ctx.fillStyle = '#2E4057';
        ctx.textAlign = 'center';
        ctx.font = '800 20px Archivo, sans-serif';
        ctx.fillText('DATE: 2026.08.15 · TIME: MEMORY', W / 2, fy + 40);

    } else {
        // ====================================================================
        // CLASSIC / SIGNATURE TECH EMERALD & NOIR
        // ====================================================================
        // Header
        ctx.fillStyle = theme.textColor;
        ctx.textAlign = 'left';
        ctx.font = '800 22px Archivo, sans-serif';
        ctx.fillText(theme.headerTitle || 'Tech IS', PAD, 44);
        ctx.font = '700 11px "Space Mono", monospace';
        ctx.globalAlpha = 0.75;
        ctx.fillText(theme.headerSub || 'OFFICIAL PHOTO BOOTH', PAD, 63);
        ctx.globalAlpha = 1;

        if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
            const logoSize = 48;
            const lx = W - PAD - logoSize;
            const ly = Math.round((headerH - 10 - logoSize) / 2) + 2;
            ctx.save();
            drawRoundedRect(ctx, lx, ly, logoSize, logoSize, 8);
            ctx.clip();
            ctx.drawImage(logoImg, lx, ly, logoSize, logoSize);
            ctx.restore();
        }

        ctx.strokeStyle = theme.line;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(PAD, headerH - 10);
        ctx.lineTo(W - PAD, headerH - 10);
        ctx.stroke();

        loadedImages.forEach((img, i) => {
            let px = PAD;
            let py = headerH + i * (photoH + GAP);

            if (isGrid) {
                const col = i % 2;
                const row = Math.floor(i / 2);
                px = PAD + col * (photoW + GAP);
                py = headerH + row * (photoH + GAP);
            }

            if (img) {
                ctx.save();
                drawRoundedRect(ctx, px, py, photoW, photoH, 6);
                ctx.clip();
                ctx.filter = FILTER_CSS[selectedFilter] || 'none';
                ctx.drawImage(img, px, py, photoW, photoH);
                ctx.restore();
            }

            ctx.strokeStyle = theme.line;
            ctx.lineWidth = 2;
            drawRoundedRect(ctx, px, py, photoW, photoH, 6);
            ctx.stroke();

            ctx.fillStyle = theme.bg;
            ctx.fillRect(px, py, 28, 16);
            ctx.fillStyle = theme.textColor;
            ctx.textAlign = 'left';
            ctx.font = '700 9px "Space Mono", monospace';
            ctx.fillText('0' + (i + 1), px + 5, py + 12);
        });

        // Footer
        const fy = H - footerH;
        ctx.strokeStyle = theme.line;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(PAD, fy);
        ctx.lineTo(W - PAD, fy);
        ctx.stroke();

        ctx.fillStyle = theme.textColor;
        ctx.textAlign = 'center';
        ctx.font = '800 16px Archivo, sans-serif';
        wrapCenterText(ctx, theme.title || 'TECH IS EXHIBIT SOUVENIR', W / 2, fy + 26, W - PAD * 2, 20);
        ctx.font = '700 10px "Space Mono", monospace';
        ctx.globalAlpha = 0.75;
        ctx.fillText(theme.sub || 'MOMENTS IN FOCUS · 2026', W / 2, fy + 56);
        ctx.globalAlpha = 1;
    }

    // ── 5. RENDER USER-PLACED STICKERS & DECALS OVER THE STRIP ──────────────
    renderStickers(ctx, stickers, W, H);
}

/**
 * Renders interactive user stickers & badges onto the canvas.
 */
export function drawVectorBow(ctx, size, color = '#FF4D6D') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;

    const w = size * 0.52;
    const h = size * 0.36;

    // Left loop
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-w, -h * 1.2, -w * 1.2, h * 0.8, 0, 0);
    ctx.fill();
    ctx.stroke();

    // Right loop
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(w, -h * 1.2, w * 1.2, h * 0.8, 0, 0);
    ctx.fill();
    ctx.stroke();

    // Tails
    ctx.beginPath();
    ctx.moveTo(-2, 2);
    ctx.quadraticCurveTo(-w * 0.6, h * 1.4, -w * 0.8, h * 1.6);
    ctx.moveTo(2, 2);
    ctx.quadraticCurveTo(w * 0.6, h * 1.4, w * 0.8, h * 1.6);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = color;
    ctx.stroke();

    // Center knot
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
}

export function drawVectorHeart(ctx, size, color = '#E63946') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;

    const s = size * 0.45;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.6);
    ctx.bezierCurveTo(-s * 1.3, -s * 0.4, -s * 0.9, -s * 1.3, 0, -s * 0.4);
    ctx.bezierCurveTo(s * 0.9, -s * 1.3, s * 1.3, -s * 0.4, 0, s * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glossy highlight
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.beginPath();
    ctx.arc(-s * 0.4, -s * 0.45, s * 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

export function drawVectorSparkleHeart(ctx, size, color = '#FF758F') {
    drawVectorHeart(ctx, size, color);
    drawSparkleStar(ctx, size * 0.28, -size * 0.28, size * 0.28, '#FFFFFF');
}

export function drawVectorStar4(ctx, size, color = '#F4B41A') {
    drawSparkleStar(ctx, 0, 0, size * 0.48, color);
}

export function drawVectorStar8(ctx, size, color = '#F72585') {
    ctx.save();
    drawSparkleStar(ctx, 0, 0, size * 0.48, color);
    ctx.rotate(Math.PI / 4);
    drawSparkleStar(ctx, 0, 0, size * 0.32, color);
    ctx.restore();
}

export function drawVectorButterfly(ctx, size, color = '#B5179E') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;

    const s = size * 0.45;
    // Left upper wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s * 1.2, -s * 1.2, -s * 1.4, -s * 0.2, 0, 0);
    ctx.fill(); ctx.stroke();

    // Right upper wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(s * 1.2, -s * 1.2, s * 1.4, -s * 0.2, 0, 0);
    ctx.fill(); ctx.stroke();

    // Left lower wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s, s, -s * 0.4, s * 1.1, 0, 0);
    ctx.fill(); ctx.stroke();

    // Right lower wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(s, s, s * 0.4, s * 1.1, 0, 0);
    ctx.fill(); ctx.stroke();

    // Center body
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.12, s * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

export function drawVectorFlame(ctx, size, color = '#FF5400') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFE3A8';
    ctx.lineWidth = 1.5;

    const s = size * 0.48;
    ctx.beginPath();
    ctx.moveTo(0, s);
    ctx.bezierCurveTo(-s * 0.8, s * 0.4, -s * 0.9, -s * 0.2, -s * 0.3, -s);
    ctx.bezierCurveTo(-s * 0.2, -s * 0.3, 0, -s * 0.5, 0.2 * s, -s * 0.9);
    ctx.bezierCurveTo(0.4 * s, -s * 0.2, s * 0.8, 0, s * 0.7, s * 0.5);
    ctx.bezierCurveTo(0.6 * s, s, 0.2 * s, s, 0, s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Inner yellow flame
    ctx.fillStyle = '#FFD166';
    ctx.beginPath();
    ctx.moveTo(0, s * 0.8);
    ctx.bezierCurveTo(-s * 0.4, s * 0.4, -s * 0.4, 0, 0, -s * 0.4);
    ctx.bezierCurveTo(s * 0.4, 0, s * 0.4, s * 0.4, 0, s * 0.8);
    ctx.fill();

    ctx.restore();
}

export function drawVectorLightning(ctx, size, color = '#FFD166') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.8;

    const s = size * 0.48;
    ctx.beginPath();
    ctx.moveTo(s * 0.2, -s);
    ctx.lineTo(-s * 0.5, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(-s * 0.2, s);
    ctx.lineTo(s * 0.5, -s * 0.1);
    ctx.lineTo(0, -s * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

export function drawVectorFlower(ctx, size, color = '#FFB703') {
    ctx.save();
    const s = size * 0.45;
    const petals = 5;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 1;

    for (let p = 0; p < petals; p++) {
        const angle = (p / petals) * Math.PI * 2;
        const px = s * 0.45 * Math.cos(angle);
        const py = s * 0.45 * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(px, py, s * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    // Center
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

export function drawVectorCherry(ctx, size, color = '#D90429') {
    ctx.save();
    const s = size * 0.45;

    // Green stem
    ctx.strokeStyle = '#38B000';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-s * 0.4, 0);
    ctx.quadraticCurveTo(0, -s * 0.9, s * 0.3, -s);
    ctx.moveTo(s * 0.4, 0);
    ctx.quadraticCurveTo(0, -s * 0.9, s * 0.3, -s);
    ctx.stroke();

    // Leaf
    ctx.fillStyle = '#70E000';
    ctx.beginPath();
    ctx.ellipse(s * 0.1, -s * 0.8, s * 0.25, s * 0.12, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Cherries
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(-s * 0.4, s * 0.2, s * 0.35, 0, Math.PI * 2);
    ctx.arc(s * 0.4, s * 0.25, s * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Gloss highlights
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-s * 0.5, s * 0.08, s * 0.09, 0, Math.PI * 2);
    ctx.arc(s * 0.3, s * 0.12, s * 0.09, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

export function drawVectorAngelWings(ctx, size, color = '#FFFFFF') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 1.2;

    const s = size * 0.5;
    // Left Wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s * 0.6, -s * 0.6, -s * 1.2, -s * 0.2, -s * 0.8, s * 0.4);
    ctx.bezierCurveTo(-s * 0.5, s * 0.5, -s * 0.2, s * 0.3, 0, 0);
    ctx.fill(); ctx.stroke();

    // Right Wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(s * 0.6, -s * 0.6, s * 1.2, -s * 0.2, s * 0.8, s * 0.4);
    ctx.bezierCurveTo(s * 0.5, s * 0.5, s * 0.2, s * 0.3, 0, 0);
    ctx.fill(); ctx.stroke();

    ctx.restore();
}
export function drawVectorLips(ctx, size, color = '#D90429') {
    ctx.save();
    ctx.fillStyle = color;
    const s = size * 0.46;
    // Upper lip
    ctx.beginPath();
    ctx.moveTo(-s, 0);
    ctx.bezierCurveTo(-s * 0.6, -s * 0.7, -s * 0.2, -s * 0.5, 0, -s * 0.2);
    ctx.bezierCurveTo(s * 0.2, -s * 0.5, s * 0.6, -s * 0.7, s, 0);
    ctx.bezierCurveTo(s * 0.5, -s * 0.1, -s * 0.5, -s * 0.1, -s, 0);
    ctx.fill();

    // Lower lip
    ctx.beginPath();
    ctx.moveTo(-s, 0);
    ctx.bezierCurveTo(-s * 0.6, s * 0.8, s * 0.6, s * 0.8, s, 0);
    ctx.bezierCurveTo(s * 0.4, s * 0.2, -s * 0.4, s * 0.2, -s, 0);
    ctx.fill();

    // Gloss
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.beginPath();
    ctx.arc(0, s * 0.35, s * 0.12, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

export function drawVectorRose(ctx, size, color = '#C9184A') {
    ctx.save();
    const s = size * 0.45;
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.2;

    // Petal layers
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#A01A3D';
    ctx.beginPath();
    ctx.arc(-s * 0.1, -s * 0.1, s * 0.45, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FF4D6D';
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Leaves
    ctx.fillStyle = '#38B000';
    ctx.beginPath();
    ctx.ellipse(-s * 0.6, s * 0.5, s * 0.25, s * 0.12, Math.PI / 4, 0, Math.PI * 2);
    ctx.ellipse(s * 0.6, s * 0.5, s * 0.25, s * 0.12, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

export function drawVectorClover(ctx, size, color = '#38B000') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.2;
    const s = size * 0.45;

    // 4 Heart petals
    for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 2);
        ctx.beginPath();
        ctx.arc(-s * 0.22, -s * 0.35, s * 0.2, 0, Math.PI * 2);
        ctx.arc(s * 0.22, -s * 0.35, s * 0.2, 0, Math.PI * 2);
        ctx.moveTo(0, 0);
        ctx.lineTo(-s * 0.38, -s * 0.25);
        ctx.lineTo(s * 0.38, -s * 0.25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    // Stem
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.2);
    ctx.quadraticCurveTo(s * 0.3, s * 0.7, s * 0.4, s * 0.9);
    ctx.stroke();

    ctx.restore();
}

export function drawVectorCrown(ctx, size, color = '#F4B41A') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;

    const w = size * 0.8;
    const h = size * 0.5;

    ctx.beginPath();
    ctx.moveTo(-w / 2, h / 2);
    ctx.lineTo(-w / 2, -h / 4);
    ctx.lineTo(-w / 4, 0);
    ctx.lineTo(0, -h / 2);
    ctx.lineTo(w / 4, 0);
    ctx.lineTo(w / 2, -h / 4);
    ctx.lineTo(w / 2, h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Jewels
    ctx.fillStyle = '#E63946';
    ctx.beginPath();
    ctx.arc(0, -h / 2 + 2, 3, 0, Math.PI * 2);
    ctx.arc(-w / 2, -h / 4 + 2, 2.5, 0, Math.PI * 2);
    ctx.arc(w / 2, -h / 4 + 2, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

export function drawVectorCyberCross(ctx, size, color = '#4CC9F0') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;

    const s = size * 0.48;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.2, -s * 0.2);
    ctx.lineTo(s, 0);
    ctx.lineTo(s * 0.2, s * 0.2);
    ctx.lineTo(0, s);
    ctx.lineTo(-s * 0.2, s * 0.2);
    ctx.lineTo(-s, 0);
    ctx.lineTo(-s * 0.2, -s * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

export function drawVectorSparkles(ctx, size, color = '#F4B41A') {
    drawSparkleStar(ctx, 0, 0, size * 0.35, color);
    drawSparkleStar(ctx, size * 0.3, -size * 0.25, size * 0.18, '#FFFFFF');
    drawSparkleStar(ctx, -size * 0.28, size * 0.22, size * 0.16, color);
}

export function drawVectorMusicNote(ctx, size, color = '#7209B7') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;

    const s = size * 0.45;
    // Left note head
    ctx.beginPath();
    ctx.ellipse(-s * 0.4, s * 0.4, s * 0.25, s * 0.18, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    // Right note head
    ctx.beginPath();
    ctx.ellipse(s * 0.4, s * 0.2, s * 0.25, s * 0.18, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    // Stems & Beam
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-s * 0.2, s * 0.35);
    ctx.lineTo(-s * 0.2, -s * 0.5);
    ctx.lineTo(s * 0.6, -s * 0.7);
    ctx.lineTo(s * 0.6, s * 0.15);
    ctx.stroke();

    ctx.restore();
}

export function drawVectorSunglasses(ctx, size, color = '#141414') {
    ctx.save();
    const w = size * 0.85;
    const h = size * 0.35;

    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;

    // Left lens
    drawRoundedRect(ctx, -w / 2, -h / 2, w * 0.44, h, 4);
    ctx.fill(); ctx.stroke();

    // Right lens
    drawRoundedRect(ctx, w * 0.06, -h / 2, w * 0.44, h, 4);
    ctx.fill(); ctx.stroke();

    // Bridge
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(-w * 0.06, -h * 0.2, w * 0.12, 3);

    // Glare
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-w * 0.4, -h * 0.3);
    ctx.lineTo(-w * 0.2, h * 0.2);
    ctx.moveTo(w * 0.15, -h * 0.3);
    ctx.lineTo(w * 0.35, h * 0.2);
    ctx.stroke();

    ctx.restore();
}

/**
 * Renders modern vector stickers & badges onto the canvas.
 */
export function renderStickers(ctx, stickers, W, H) {
    if (!stickers || !Array.isArray(stickers) || stickers.length === 0) return;

    stickers.forEach(stk => {
        const x = stk.x * W;
        const y = stk.y * H;
        const size = stk.size || 48;
        const rot = ((stk.rotation || 0) * Math.PI) / 180;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);

        // Soft vector drop shadow
        ctx.shadowColor = 'rgba(0,0,0,0.22)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 3;

        if (stk.type === 'badge') {
            const text = stk.content || 'LOVE';
            ctx.font = `800 ${Math.round(size * 0.42)}px Archivo, sans-serif`;
            const textW = ctx.measureText(text).width;
            const padX = 14, padY = 8;
            const badgeW = textW + padX * 2;
            const badgeH = Math.round(size * 0.62) + padY;

            ctx.fillStyle = stk.bgColor || '#681B24';
            drawRoundedRect(ctx, -badgeW / 2, -badgeH / 2, badgeW, badgeH, 6);
            ctx.fill();

            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = stk.borderColor || '#FFFFFF';
            ctx.lineWidth = 1.8;
            drawRoundedRect(ctx, -badgeW / 2, -badgeH / 2, badgeW, badgeH, 6);
            ctx.stroke();

            ctx.fillStyle = stk.textColor || '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 0, 1);
        } else if (stk.type === 'vector_bow') {
            drawVectorBow(ctx, size, stk.color || '#FF4D6D');
        } else if (stk.type === 'vector_heart') {
            drawVectorHeart(ctx, size, stk.color || '#E63946');
        } else if (stk.type === 'vector_sparkle_heart') {
            drawVectorSparkleHeart(ctx, size, stk.color || '#FF758F');
        } else if (stk.type === 'vector_star4') {
            drawVectorStar4(ctx, size, stk.color || '#F4B41A');
        } else if (stk.type === 'vector_star8') {
            drawVectorStar8(ctx, size, stk.color || '#F72585');
        } else if (stk.type === 'vector_butterfly') {
            drawVectorButterfly(ctx, size, stk.color || '#B5179E');
        } else if (stk.type === 'vector_flame') {
            drawVectorFlame(ctx, size, stk.color || '#FF5400');
        } else if (stk.type === 'vector_lightning') {
            drawVectorLightning(ctx, size, stk.color || '#FFD166');
        } else if (stk.type === 'vector_flower') {
            drawVectorFlower(ctx, size, stk.color || '#FFB703');
        } else if (stk.type === 'vector_cherry') {
            drawVectorCherry(ctx, size, stk.color || '#D90429');
        } else if (stk.type === 'vector_angel_wings') {
            drawVectorAngelWings(ctx, size, stk.color || '#FFFFFF');
        } else if (stk.type === 'vector_camera') {
            drawVectorCamera(ctx, size, stk.color || '#173F30');
        } else if (stk.type === 'vector_kiss_lips') {
            drawVectorLips(ctx, size, stk.color || '#D90429');
        } else if (stk.type === 'vector_rose') {
            drawVectorRose(ctx, size, stk.color || '#C9184A');
        } else if (stk.type === 'vector_clover') {
            drawVectorClover(ctx, size, stk.color || '#38B000');
        } else if (stk.type === 'vector_crown') {
            drawVectorCrown(ctx, size, stk.color || '#F4B41A');
        } else if (stk.type === 'vector_cyber_cross') {
            drawVectorCyberCross(ctx, size, stk.color || '#4CC9F0');
        } else if (stk.type === 'vector_sparkles') {
            drawVectorSparkles(ctx, size, stk.color || '#F4B41A');
        } else if (stk.type === 'vector_music_note') {
            drawVectorMusicNote(ctx, size, stk.color || '#7209B7');
        } else if (stk.type === 'vector_sunglasses') {
            drawVectorSunglasses(ctx, size, stk.color || '#141414');
        }

        ctx.restore();
    });
}
