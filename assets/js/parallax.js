/* ============================
   Effet Parallax
   ============================ */

class ParallaxManager {
    constructor() {
        this.elements = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.parallaxStrength = 20;
        this.init();
    }

    init() {
        this.collectElements();
        this.setupEventListeners();
        this.animate();
    }

    collectElements() {
        // Collecter tous les éléments avec l'attribut data-parallax
        document.querySelectorAll('[data-parallax]').forEach(element => {
            const value = parseFloat(element.getAttribute('data-parallax')) || 0;
            this.elements.push({
                element: element,
                value: value,
                x: 0,
                y: 0,
                targetX: 0,
                targetY: 0
            });
        });
    }

    setupEventListeners() {
        // Parallax à la souris
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Parallax au scroll
        window.addEventListener('scroll', () => {
            this.updateScrollParallax();
        });

        // Recollect elements dynamiquement
        window.addEventListener('load', () => {
            this.collectElements();
        });
    }

    updateScrollParallax() {
        const scrollY = window.scrollY;
        
        this.elements.forEach(item => {
            const element = item.element;
            const rect = element.getBoundingClientRect();
            const elementCenterY = rect.top + rect.height / 2;
            
            // Parallax basé sur la profondeur et le scroll
            const offset = (elementCenterY - window.innerHeight / 2) * item.value * 0.1;
            element.style.transform = `translateY(${offset}px)`;
        });
    }

    updateMouseParallax() {
        const viewport = Utils.getViewportDimensions();
        const centerX = viewport.centerX;
        const centerY = viewport.centerY;
        
        this.elements.forEach(item => {
            const element = item.element;
            const rect = element.getBoundingClientRect();
            
            // Parallax basé sur la position de la souris
            const relativeX = (this.mouseX - centerX) / centerX;
            const relativeY = (this.mouseY - centerY) / centerY;
            
            item.targetX = relativeX * this.parallaxStrength * item.value;
            item.targetY = relativeY * this.parallaxStrength * item.value;
            
            // Smooth animation
            item.x = Utils.lerp(item.x, item.targetX, 0.05);
            item.y = Utils.lerp(item.y, item.targetY, 0.05);
        });
    }

    animate() {
        this.updateMouseParallax();
        requestAnimationFrame(() => this.animate());
    }

    // Ajouter un nouvel élément parallax
    addElement(element, value = 1) {
        if (element) {
            element.setAttribute('data-parallax', value);
            this.elements.push({
                element: element,
                value: value,
                x: 0,
                y: 0,
                targetX: 0,
                targetY: 0
            });
        }
    }

    // Retirer un élément parallax
    removeElement(element) {
        this.elements = this.elements.filter(item => item.element !== element);
    }

    // Changer la force du parallax
    setParallaxStrength(strength) {
        this.parallaxStrength = strength;
    }
}

// Initialiser le gestionnaire de parallax
const parallaxManager = new ParallaxManager();

// Exporter pour utilisation globale
window.parallaxManager = parallaxManager;
