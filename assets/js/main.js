/* ============================
   Main Application File
   ============================ */

class ImmersiveApp {
    constructor() {
        this.initialized = false;
        this.config = {
            parallaxStrength: 20,
            scrollSensitivity: 0.1,
            animationDuration: 0.6,
            fps: 60
        };
        this.init();
    }

    init() {
        this.setupApp();
        this.hideLoadingIndicator();
        this.setupScrollAnimations();
        this.setupInteractions();
        this.setupStoryTelling();
        this.logInitialization();
        this.initialized = true;
    }

    setupApp() {
        // S'assurer que tous les managers sont initialisés
        console.log('✨ Initialisation de l\'application immersive...');
        
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.completeSetup());
        } else {
            this.completeSetup();
        }
    }

    completeSetup() {
        // Activer les animations de scroll
        this.activateScrollAnimations();
        
        // Initialiser les interactions
        this.setupClickInteractions();
        
        // Setup les boutons CTA
        this.setupCTAButtons();
    }

    hideLoadingIndicator() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            setTimeout(() => {
                loadingIndicator.classList.add('hidden');
            }, 1000);
        }
    }

    setupScrollAnimations() {
        // Les animations de scroll sont géréees par scrollEffectManager
        console.log('📜 Animations de scroll activées');
    }

    activateScrollAnimations() {
        // Animer tous les éléments avec des classes d'animation
        const animatedElements = document.querySelectorAll(
            '[data-animation], .fade-in, .fade-in-up, .fade-in-left, .fade-in-right'
        );

        animatedElements.forEach((element, index) => {
            const delay = parseFloat(element.getAttribute('data-animation-delay') || 0);
            element.style.animationDelay = `${delay}s`;
        });
    }

    setupInteractions() {
        // Gestion des clics pour créer des ripples dans la scène 3D
        document.addEventListener('click', (e) => {
            if (scene3D && e.target !== e.currentTarget) {
                // Créer une ripple effect basée sur la position du clic
                const x = (e.clientX / window.innerWidth) * 2 - 1;
                const y = -(e.clientY / window.innerHeight) * 2 + 1;
                const z = 0;
                
                scene3D.createRipple(new THREE.Vector3(x * 20, y * 20, z));
            }
        });

        // Gestion du clavier
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e);
        });
    }

    handleKeyboardInput(event) {
        switch(event.key) {
            case 'Escape':
                console.log('Escape pressed');
                break;
            case ' ':
                event.preventDefault();
                // Scroll down
                window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                break;
            case 'ArrowUp':
                event.preventDefault();
                window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' });
                break;
            case 'ArrowDown':
                event.preventDefault();
                window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
                break;
        }
    }

    setupCTAButtons() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCTAClick(button);
            });

            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });
        });
    }

    handleCTAClick(button) {
        const target = button.getAttribute('data-scroll-to');
        
        if (target) {
            const targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // Default action
            console.log('CTA Button clicked:', button.textContent);
            // Vous pouvez ajouter une action par défaut ici
        }
    }

    setupStoryTelling() {
        // Ajouter des animations au contenu de storytelling
        const storyChapters = document.querySelectorAll('.story-chapter');
        
        storyChapters.forEach((chapter, index) => {
            const isOdd = index % 2 === 0;
            const className = isOdd ? 'fade-in-left' : 'fade-in-right';
            
            if (!chapter.classList.contains('fade-in-left') && !chapter.classList.contains('fade-in-right')) {
                chapter.classList.add(className);
                chapter.style.animationDelay = `${index * 0.2}s`;
            }
        });

        console.log('📖 Storytelling activé');
    }

    // Méthodes de contrôle
    setParallaxStrength(strength) {
        this.config.parallaxStrength = strength;
        parallaxManager.setParallaxStrength(strength);
    }

    toggleDebugMode(enabled) {
        if (enabled) {
            console.log('🐛 Debug Mode ON');
            window.debug = {
                scene3D: scene3D,
                parallaxManager: parallaxManager,
                scrollEffectManager: scrollEffectManager,
                utils: Utils,
                config: this.config
            };
            console.log('Debug objects:', window.debug);
        } else {
            console.log('🐛 Debug Mode OFF');
            window.debug = null;
        }
    }

    logInitialization() {
        console.log('%c🚀 Expérience Immersive Initialisée', 'color: #667eea; font-size: 16px; font-weight: bold;');
        console.log('%cAnimations: 3D Scene, Parallax, Scroll Effects, Storytelling', 'color: #f093fb;');
        console.log('%cUtilisez window.debug pour accéder aux contrôles', 'color: #764ba2;');
    }

    // API publique
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    getConfig() {
        return this.config;
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }

    // Performance monitoring
    getPerformanceMetrics() {
        const metrics = performance.getEntriesByType('navigation')[0];
        return {
            loadTime: metrics.loadEventEnd - metrics.loadEventStart,
            domContentLoaded: metrics.domContentLoadedEventEnd - metrics.domContentLoadedEventStart,
            navigationTiming: metrics
        };
    }
}

// Initialiser l'application
let app = null;

window.addEventListener('DOMContentLoaded', () => {
    app = new ImmersiveApp();
    window.app = app;
});

// Alternative si DOMContentLoaded est déjà déclenché
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    app = new ImmersiveApp();
    window.app = app;
}

/* ============================
   Événements Globaux
   ============================ */

// Gestion de la visibilité de la page
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (scene3D) scene3D.pause();
        console.log('📦 App paused (page hidden)');
    } else {
        if (scene3D) scene3D.resume();
        console.log('▶️ App resumed (page visible)');
    }
});

// Gestion de l'orientation
window.addEventListener('orientationchange', () => {
    console.log('📱 Orientation changed');
    if (scene3D) {
        setTimeout(() => scene3D.onWindowResize(), 100);
    }
});

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
    console.error('❌ Error:', event.error);
});

/* ============================
   Développement - Commandes de Debug
   ============================ */

// Activer le debug mode avec Ctrl+Shift+D
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        if (window.debug) {
            app.toggleDebugMode(false);
        } else {
            app.toggleDebugMode(true);
        }
    }
});

// Afficher des stats au console avec 'stats'
window.showStats = function() {
    console.log('%cPerformance Stats', 'font-size: 14px; font-weight: bold; color: #667eea;');
    const metrics = app.getPerformanceMetrics();
    console.table(metrics);
};

// Naviguer vers une section avec 'goto(sectionId)'
window.goto = function(sectionId) {
    app.scrollToSection(sectionId);
};

console.log('%c💡 Commandes disponibles:', 'color: #764ba2; font-size: 12px;');
console.log('• window.app - Instance de l\'application');
console.log('• window.goto("section-id") - Navigate to section');
console.log('• window.showStats() - Show performance metrics');
console.log('• Ctrl+Shift+D - Toggle debug mode');
