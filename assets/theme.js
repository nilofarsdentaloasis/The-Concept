/**
 * The Concept - Vintage Switch & Luxury Theme Controller
 */

(function () {
    const THEME_KEY = 'the_concept_theme';

    // Play ultra-realistic vintage mechanical toggle switch sound
    function playSwitchAudio(isDark) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();

            // Low frequency mechanical thud
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'triangle';
            osc1.frequency.setValueAtTime(isDark ? 130 : 170, ctx.currentTime);
            osc1.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.08);
            gain1.gain.setValueAtTime(0.28, ctx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start(ctx.currentTime);
            osc1.stop(ctx.currentTime + 0.09);

            // High metallic snap
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'square';
            osc2.frequency.setValueAtTime(isDark ? 1750 : 2150, ctx.currentTime + 0.004);
            osc2.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.045);
            gain2.gain.setValueAtTime(0.16, ctx.currentTime + 0.004);
            gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start(ctx.currentTime + 0.004);
            osc2.stop(ctx.currentTime + 0.05);

            // Subtle metallic casing ring
            const osc3 = ctx.createOscillator();
            const gain3 = ctx.createGain();
            osc3.type = 'sine';
            osc3.frequency.setValueAtTime(920, ctx.currentTime + 0.01);
            osc3.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12);
            gain3.gain.setValueAtTime(0.09, ctx.currentTime + 0.01);
            gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
            osc3.connect(gain3);
            gain3.connect(ctx.destination);
            osc3.start(ctx.currentTime + 0.01);
            osc3.stop(ctx.currentTime + 0.13);
        } catch (e) {
            // Audio context not allowed before user gesture or unavailable
        }
    }

    // Apply theme state
    window.applyTheme = function (theme, animate) {
        const isDark = theme === 'dark';
        const root = document.documentElement;
        const body = document.body;

        if (animate) {
            // Add gradual transition classes
            root.classList.add('theme-transitioning');
            let overlay = document.getElementById('theme-transition-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'theme-transition-overlay';
                document.body.appendChild(overlay);
            }
            overlay.classList.add('active');

            // Sound feedback
            playSwitchAudio(isDark);

            setTimeout(() => {
                overlay.classList.remove('active');
            }, 500);

            setTimeout(() => {
                root.classList.remove('theme-transitioning');
            }, 900);
        }

        if (isDark) {
            root.classList.add('dark');
            if (body) body.classList.add('dark');
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            root.classList.remove('dark');
            if (body) body.classList.remove('dark');
            localStorage.setItem(THEME_KEY, 'light');
        }

        // Trigger logo & header refresh
        if (typeof window.updateHeaderTheme === 'function') {
            window.updateHeaderTheme();
        }
    };

    // Toggle switch handler
    window.toggleTheme = function () {
        const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        window.applyTheme(nextTheme, true);
    };

    // Initialize immediate state (prevent flash)
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    // Bind event listeners once DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const switchBtn = document.getElementById('vintageThemeSwitch');
        if (switchBtn) {
            switchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.toggleTheme();
            });
        }

        // Ensure transition overlay exists
        if (!document.getElementById('theme-transition-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'theme-transition-overlay';
            document.body.appendChild(overlay);
        }

        // Sync initial state
        const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
        window.applyTheme(currentTheme, false);
    });
})();
