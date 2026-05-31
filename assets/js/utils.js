/* ============================
   Utilitaires JavaScript
   ============================ */

const Utils = {
    // Détection du scroll
    isScrollingDown: false,
    lastScrollY: 0,
    isScrolling: false,

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('wheel', () => this.setScrolling(true));
    },

    handleScroll() {
        const currentScrollY = window.scrollY;
        this.isScrollingDown = currentScrollY > this.lastScrollY;
        this.lastScrollY = currentScrollY;
    },

    setScrolling(scrolling) {
        this.isScrolling = scrolling;
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 100);
    },

    // Calcul de la position relative au viewport
    getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            center: rect.top + rect.height / 2,
            visible: rect.bottom > 0 && rect.top < window.innerHeight
        };
    },

    // Normalisation des valeurs
    normalize(value, min, max) {
        return (value - min) / (max - min);
    },

    // Lerp (interpolation linéaire)
    lerp(a, b, t) {
        return a + (b - a) * t;
    },

    // Clamp
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },

    // Ease functions
    easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },

    easeOut(t) {
        return t * (2 - t);
    },

    easeIn(t) {
        return t * t;
    },

    // Debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Ajouter une classe avec délai
    addClassWithDelay(element, className, delay) {
        setTimeout(() => {
            element.classList.add(className);
        }, delay);
    },

    // Obtenir la vue du port
    getViewportDimensions() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            centerX: window.innerWidth / 2,
            centerY: window.innerHeight / 2
        };
    },

    // Parallax value (basé sur la position de la souris)
    getMouseParallax(mouseX, mouseY) {
        const viewport = this.getViewportDimensions();
        const x = (mouseX - viewport.centerX) / viewport.width;
        const y = (mouseY - viewport.centerY) / viewport.height;
        return { x, y };
    },

    // Animate value
    animateValue(start, end, duration, callback) {
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = start + (end - start) * this.easeInOut(progress);
            
            callback(value);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    // Détecter le mouvement
    getMouseDirection(prevX, prevY, currentX, currentY) {
        const dx = currentX - prevX;
        const dy = currentY - prevY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return {
            x: dx,
            y: dy,
            distance: distance,
            angle: Math.atan2(dy, dx)
        };
    },

    // Format number
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Générer un UUID
    generateId() {
        return 'id-' + Math.random().toString(36).substr(2, 9);
    },

    // Random entre min et max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Random Int
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

// Initialiser au chargement
window.addEventListener('DOMContentLoaded', () => {
    Utils.init();
});
