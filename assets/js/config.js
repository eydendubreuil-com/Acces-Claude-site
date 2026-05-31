/* ============================
   Configuration Avancée
   ============================ */

/**
 * Cette file contient des configurations et des exemples avancés
 * pour personnaliser votre expérience immersive.
 * 
 * Importer ce fichier dans index.html après main.js:
 * <script src="assets/js/config.js"></script>
 */

// Configuration globale
const CONFIG = {
    // Parallax
    parallax: {
        enabled: true,
        strength: 20,
        smoothness: 0.05,
        mouseEnabled: true,
        scrollEnabled: true
    },

    // Animations
    animations: {
        duration: 600, // en ms
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        enabled: true,
        reduceMotion: false
    },

    // 3D Scene
    scene3d: {
        enabled: true,
        autoRotate: true,
        rotationSpeed: 0.005,
        particleCount: 1000,
        shadowsEnabled: true,
        fogEnabled: true
    },

    // Performance
    performance: {
        targetFPS: 60,
        enableGPUAcceleration: true,
        useIntersectionObserver: true,
        throttleScrollEvents: true
    },

    // Debug
    debug: {
        enabled: false,
        showFPS: false,
        showStats: false,
        logAnimations: false
    },

    // Couleurs personnalisées
    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
        dark: '#0a0e27',
        light: '#ffffff',
        success: '#00ff88',
        warning: '#ff6b6b'
    }
};

// Appliquer les configurations au chargement
window.addEventListener('DOMContentLoaded', () => {
    applyConfiguration();
});

function applyConfiguration() {
    // Appliquer les configurations parallax
    if (typeof parallaxManager !== 'undefined') {
        parallaxManager.setParallaxStrength(CONFIG.parallax.strength);
    }

    // Appliquer les configurations 3D
    if (typeof scene3D !== 'undefined' && scene3D) {
        if (!CONFIG.scene3d.shadowsEnabled && scene3D.renderer) {
            scene3D.renderer.shadowMap.enabled = false;
        }
    }

    // Appliquer les réductions de mouvement
    if (CONFIG.animations.reduceMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }

    // Appliquer les couleurs
    applyCSSVariables();

    // Debug
    if (CONFIG.debug.enabled) {
        setupDebugMode();
    }
}

function applyCSSVariables() {
    const root = document.documentElement;
    Object.entries(CONFIG.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });
}

function setupDebugMode() {
    window.CONFIG = CONFIG;
    console.log('🐛 Configuration Debug Mode activé');
    console.log('Accédez à CONFIG pour modifier les paramètres');
}

/* ============================
   Hooks d'Animation Avancés
   ============================ */

// Exécuter une fonction quand une section entre en vue
function onSectionEnter(sectionId, callback) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry);
            }
        });
    });

    observer.observe(section);
}

// Exemple d'utilisation:
// onSectionEnter('section-3', (entry) => {
//     console.log('Section 3 is visible!');
//     // Ajouter une animation custom
//     entry.target.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
// });

/* ============================
   Crédits et Remerciements
   ============================ */

const CREDITS = {
    author: 'Your Name',
    version: '1.0.0',
    created: new Date().getFullYear(),
    technologies: [
        'HTML5',
        'CSS3',
        'JavaScript ES6+',
        'Three.js',
        'WebGL'
    ],
    thanks: [
        'Three.js Community',
        'MDN Web Docs',
        'Stack Overflow'
    ]
};

// Afficher les crédits au console
window.showCredits = () => {
    console.log(`
    %c╔═══════════════════════════════════════╗
      ║   Expérience Immersive 3D v${CREDITS.version}      ║
      ║   Créé par ${CREDITS.author.padEnd(26)} ║
      ║   © ${CREDITS.created} - Tous droits réservés     ║
      ╚═══════════════════════════════════════╝
    `, 'color: #667eea; font-weight: bold;');

    console.log('%cTechnologies utilisées:', 'font-weight: bold;');
    CREDITS.technologies.forEach(tech => {
        console.log(`  • ${tech}`);
    });

    console.log('%cRemerciements à:', 'font-weight: bold;');
    CREDITS.thanks.forEach(thanks => {
        console.log(`  • ${thanks}`);
    });
};

// Afficher les crédits si debug est activé
if (CONFIG.debug.enabled) {
    window.showCredits();
}

/* ============================
   Événements Personnalisés
   ============================ */

// Créer des événements personnalisés pour les animations
const AnimationEvents = {
    SECTION_ENTER: 'sectionEnter',
    SECTION_EXIT: 'sectionExit',
    ANIMATION_START: 'animationStart',
    ANIMATION_END: 'animationEnd',
    SCROLL_COMPLETE: 'scrollComplete'
};

// Dispatcher un événement personnalisé
function dispatchCustomEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
}

// Écouter un événement personnalisé
function onCustomEvent(eventName, callback) {
    document.addEventListener(eventName, callback);
}

// Exemples:
// onCustomEvent(AnimationEvents.SECTION_ENTER, (e) => {
//     console.log('Section entered:', e.detail);
// });

/* ============================
   Utilitaires de Performance
   ============================ */

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    startMeasure(label) {
        performance.mark(`${label}-start`);
    }

    endMeasure(label) {
        performance.mark(`${label}-end`);
        performance.measure(label, `${label}-start`, `${label}-end`);
        
        const measure = performance.getEntriesByName(label)[0];
        this.metrics[label] = measure.duration;
        
        return measure.duration;
    }

    getMetrics() {
        return this.metrics;
    }

    logMetrics() {
        console.table(this.metrics);
    }
}

const performanceMonitor = new PerformanceMonitor();

// Exemple:
// performanceMonitor.startMeasure('ma-animation');
// // ... faire quelque chose ...
// const time = performanceMonitor.endMeasure('ma-animation');
// console.log(`Animation took ${time}ms`);

/* ============================
   Gestionnaire d'État Global
   ============================ */

class StateManager {
    constructor() {
        this.state = {
            isLoading: false,
            isScrolling: false,
            currentSection: 'hero',
            theme: 'dark'
        };

        this.observers = [];
    }

    setState(newState) {
        const oldState = { ...this.state };
        this.state = { ...this.state, ...newState };

        // Notifier les observateurs
        this.notifyObservers(oldState, this.state);
    }

    getState() {
        return { ...this.state };
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notifyObservers(oldState, newState) {
        this.observers.forEach(observer => {
            observer(oldState, newState);
        });
    }
}

const stateManager = new StateManager();

// Exemple:
// stateManager.subscribe((oldState, newState) => {
//     if (oldState.theme !== newState.theme) {
//         console.log('Theme changed:', newState.theme);
//     }
// });
// stateManager.setState({ theme: 'light' });

export { CONFIG, CREDITS, AnimationEvents, performanceMonitor, stateManager };
