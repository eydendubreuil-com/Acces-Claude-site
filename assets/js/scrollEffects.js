/* ============================
   Effets de Scroll
   ============================ */

class ScrollEffectManager {
    constructor() {
        this.elements = new Map();
        this.scrollY = 0;
        this.windowHeight = window.innerHeight;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        window.addEventListener('resize', () => this.updateWindowHeight());
        this.observeElements();
    }

    observeElements() {
        // Observer les éléments avec des classes d'animation
        const animatedElements = document.querySelectorAll(
            '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, ' +
            '.scale-in, .rotate-in, .scroll-reveal, .scroll-card, ' +
            '.story-chapter, .timeline-item'
        );

        animatedElements.forEach(element => {
            this.elements.set(element, {
                revealed: false,
                element: element,
                offset: element.offsetTop,
                height: element.offsetHeight
            });
        });

        // Utiliser Intersection Observer pour la détection des éléments visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    handleScroll() {
        this.scrollY = window.scrollY;
        this.updateScrollElements();
        this.triggerScrollCallbacks();
    }

    updateScrollElements() {
        this.elements.forEach((data, element) => {
            const rect = element.getBoundingClientRect();
            const elementCenterY = rect.top + rect.height / 2;
            const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            
            // Ajouter la classe active si visible
            if (scrollProgress > 0 && scrollProgress < 1) {
                if (!element.classList.contains('active')) {
                    element.classList.add('active');
                }
            }

            // Mettre à jour l'attribute data-scroll-progress
            element.setAttribute('data-scroll-progress', Math.max(0, Math.min(1, scrollProgress)));
        });
    }

    revealElement(element) {
        if (!element.classList.contains('revealed')) {
            element.classList.add('revealed');
            element.classList.add('active');
            
            const data = this.elements.get(element);
            if (data) {
                data.revealed = true;
            }

            // Trigger reveal event
            const event = new CustomEvent('reveal', { detail: element });
            element.dispatchEvent(event);
        }
    }

    triggerScrollCallbacks() {
        // Callback pour les éléments avec des positions spéciales
        document.querySelectorAll('[data-scroll-callback]').forEach(element => {
            const callback = element.getAttribute('data-scroll-callback');
            const rect = element.getBoundingClientRect();
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            
            if (progress >= 0 && progress <= 1) {
                element.setAttribute('data-scroll-progress', progress);
            }
        });
    }

    updateWindowHeight() {
        this.windowHeight = window.innerHeight;
    }

    // Créer un effet de parallax au scroll
    static createScrollParallax(element, speed = 0.5) {
        const originalY = element.offsetTop;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const yPos = (scrolled - originalY) * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Créer un effet de fade au scroll
    static createScrollFade(element) {
        window.addEventListener('scroll', () => {
            const rect = element.getBoundingClientRect();
            const opacity = 1 - (rect.top / window.innerHeight);
            element.style.opacity = Math.max(0, Math.min(1, opacity));
        });
    }

    // Créer un effet de scale au scroll
    static createScrollScale(element, minScale = 0.8, maxScale = 1) {
        window.addEventListener('scroll', () => {
            const rect = element.getBoundingClientRect();
            const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
            const scale = minScale + (maxScale - minScale) * Math.max(0, Math.min(1, scrollProgress));
            element.style.transform = `scale(${scale})`;
        });
    }

    // Créer un effet de rotation au scroll
    static createScrollRotate(element, maxRotation = 360) {
        window.addEventListener('scroll', () => {
            const rect = element.getBoundingClientRect();
            const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
            const rotation = maxRotation * Math.max(0, Math.min(1, scrollProgress));
            element.style.transform = `rotate(${rotation}deg)`;
        });
    }
}

// Effet de scroll smooth pour les buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-scroll-to]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSelector = button.getAttribute('data-scroll-to');
            const targetElement = document.getElementById(targetSelector);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Initialiser le gestionnaire d'effets de scroll
const scrollEffectManager = new ScrollEffectManager();

// Exporter pour utilisation globale
window.scrollEffectManager = scrollEffectManager;

/* ============================
   Scroll-Triggered Animation
   ============================ */

class ScrollAnimationTrigger {
    constructor() {
        this.triggers = [];
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // Observer tous les éléments avec animation
        document.querySelectorAll('[data-animation]').forEach(element => {
            observer.observe(element);
        });
    }

    triggerAnimation(element) {
        const animation = element.getAttribute('data-animation');
        const delay = parseFloat(element.getAttribute('data-animation-delay') || 0);

        setTimeout(() => {
            element.classList.add('animate', animation);
        }, delay);
    }
}

new ScrollAnimationTrigger();
