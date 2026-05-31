# 🎯 Meilleures Pratiques & Guide de Style

Ce document contient les meilleures pratiques pour maintenir et étendre l'expérience immersive 3D.

## 📐 Architecture

### Principes de Base

1. **Séparation des Préoccupations** - HTML, CSS, JS séparés
2. **Modularité** - Code réutilisable et maintenable
3. **Performance** - Optimisation des ressources
4. **Accessibilité** - Support des technologies d'assistance

### Structure du Code

```
assets/
├── js/
│   ├── main.js           # Point d'entrée principal
│   ├── utils.js          # Fonctions utilitaires réutilisables
│   ├── parallax.js       # Gestionnaire d'effets parallax
│   ├── scrollEffects.js  # Gestionnaire d'animations scroll
│   ├── 3d-scene.js       # Scène 3D avec Three.js
│   └── config.js         # Configuration et état global
├── css/
│   ├── styles.css        # Styles principaux et layout
│   └── animations.css    # Définitions d'animations CSS
└── images/ models/ audio/  # Ressources médias
```

## 🎨 Styles CSS

### Conventions de Nommage

**BEM (Block Element Modifier):**

```css
/* Block */
.section { }

/* Element */
.section-title { }

/* Modifier */
.section--dark { }
.section__content--highlighted { }
```

### Couleurs et Thèmes

Utilisez les variables CSS:

```css
:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --accent: #f093fb;
    --dark: #0a0e27;
    --light: #ffffff;
}

/* Utilisation */
.element {
    color: var(--primary);
}
```

### Organisation des Styles

```css
/* 1. Reset et Variables */
* { }
:root { }

/* 2. Layout et Grille */
.container { }
.grid { }

/* 3. Typographie */
body { }
h1, h2, h3 { }

/* 4. Composants */
.button { }
.card { }

/* 5. Animations et Transitions */
@keyframes { }
.animated { }

/* 6. État et Pseudo-classes */
:hover { }
:active { }
:focus { }

/* 7. Responsive */
@media (max-width: 768px) { }
```

### Performance CSS

```css
/* ✅ BON - GPU acceleré */
.element {
    transform: translateY(10px);
    opacity: 0.8;
}

/* ✅ BON - Utiliser will-change */
.animation {
    will-change: transform, opacity;
    animation: slideIn 0.3s ease-out;
}

/* ❌ MAUVAIS - Redessine le layout */
.bad {
    top: 10px; /* utilise layout flow */
    width: 50%;
}

/* ❌ MAUVAIS - Trop de will-change */
.bad { will-change: *; }
```

## 📝 JavaScript

### Conventions de Nommage

```javascript
// Classes - PascalCase
class AnimationManager { }

// Variables et fonctions - camelCase
let animationDuration = 600;
function updateAnimation() { }

// Constantes - UPPER_SNAKE_CASE
const MAX_PARTICLES = 1000;
const ANIMATION_DURATION = 600;

// Sélecteurs DOM
const $element = document.querySelector('.element');
const $elements = document.querySelectorAll('.element');
```

### Structure des Classes

```javascript
class MyManager {
    constructor() {
        this.initialized = false;
        this.config = {};
        this.elements = [];
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.initialized = true;
    }

    setupElements() {
        // Initialiser les éléments
    }

    setupEventListeners() {
        // Configurer les event listeners
    }

    destroy() {
        // Nettoyer
        this.elements = [];
        this.initialized = false;
    }
}
```

### Gestion d'Erreurs

```javascript
// ✅ BON
try {
    const result = riskyOperation();
} catch (error) {
    console.error('Operation failed:', error);
    // Fallback gracieux
}

// ✅ BON - Vérifications défensives
if (element && element.classList) {
    element.classList.add('active');
}

// ❌ MAUVAIS - Pas de gestion d'erreur
const result = riskyOperation();
element.classList.add('active'); // Peut crasher
```

### Performance JavaScript

```javascript
/* ✅ BON - Cacher les recalculs */
const rect = element.getBoundingClientRect();
const width = rect.width;
const height = rect.height;

/* ❌ MAUVAIS - Recalculer à chaque fois */
for (let i = 0; i < 1000; i++) {
    const width = element.getBoundingClientRect().width; // Redessine à chaque fois!
}

/* ✅ BON - Throttle/Debounce */
window.addEventListener('resize', Utils.throttle(() => {
    updateLayout();
}, 250));

/* ❌ MAUVAIS - Exécuter à chaque événement */
window.addEventListener('scroll', () => {
    updateLayout(); // Exécution massive!
});
```

### Accessibilité

```html
<!-- ✅ BON -->
<button aria-label="Fermer">×</button>
<div role="navigation">
    <nav aria-label="Main navigation"></nav>
</div>

<!-- ❌ MAUVAIS -->
<div click="closeDialog()">×</div>
<div onclick="navigate()">Menu</div>
```

## 🎬 Animations

### Bonnes Pratiques

```css
/* ✅ BON - 60 FPS */
@keyframes smooth {
    0% { transform: translateY(0); }
    100% { transform: translateY(10px); }
}

/* ❌ MAUVAIS - Recalcul du layout */
@keyframes bad {
    0% { top: 0; }
    100% { top: 10px; }
}

/* ✅ BON - Timing approprié */
.button {
    transition: all 0.3s ease-out;
}

/* ❌ MAUVAIS - Trop rapide ou lent */
.button {
    transition: all 3s linear;
}
```

### Durées Recommandées

| Type | Durée |
|------|-------|
| Feedback (hover) | 150-200ms |
| Transition simple | 300-400ms |
| Animation standard | 600-800ms |
| Animation complexe | 1000ms+ |

## 🧪 Testing

### Tests Manuels

```javascript
// Test de performance
window.showStats()

// Test des animations
document.querySelectorAll('[class*="animate"]').forEach(el => {
    console.log(el.className, el.offsetTop);
});

// Test de la scène 3D
scene3D.pause();
// ... vérifier
scene3D.resume();
```

### Tests de Navigateur

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile (iOS Safari, Chrome Mobile)

## 📊 Métrics de Performance

### Cibles

- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Contentful Paint (FCP)**: < 1.8s
- **Time to Interactive (TTI)**: < 3.8s

### Mesure

```javascript
// Utiliser Web Vitals
window.addEventListener('web-vital', (e) => {
    console.log(e.name, e.value);
});

// Ou Performance API
const perfData = performance.getEntriesByType('navigation')[0];
console.log(perfData);
```

## 🔐 Sécurité

### XSS Prevention

```javascript
// ❌ MAUVAIS
element.innerHTML = userInput;

// ✅ BON
element.textContent = userInput;
// Ou
const safe = document.createElement('div');
safe.textContent = userInput;
```

### CSRF Protection

Pour les formulaires:
```html
<form method="POST">
    <input type="hidden" name="csrf-token" value="...">
    <!-- ... -->
</form>
```

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://cdnjs.cloudflare.com; 
               style-src 'self' 'unsafe-inline';">
```

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First */
/* Mobile: 320px - 480px */
.container { width: 100%; }

/* Tablet: 481px - 768px */
@media (min-width: 481px) {
    .container { width: 90%; }
}

/* Desktop: 769px - 1024px */
@media (min-width: 769px) {
    .container { width: 80%; }
}

/* Large: 1025px+ */
@media (min-width: 1025px) {
    .container { width: 1200px; }
}
```

## 🚀 Déploiement

### Checklist Pré-Déploiement

- [ ] Tous les liens fonctionnent
- [ ] Images chargent correctement
- [ ] Console sans erreurs
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Accessibilité testée
- [ ] Meta tags configurés
- [ ] Analytics configuré
- [ ] HTTPS activé
- [ ] Cache configuré

### Optimisation de Build

```bash
# Minifier CSS
npx cleancss assets/css/*.css -o dist/styles.min.css

# Minifier JS
npx terser assets/js/*.js -o dist/main.min.js

# Compresser images
npx imagemin assets/images/* --out-dir=dist/images
```

## 📚 Ressources

### Documentation

- [MDN Web Docs](https://developer.mozilla.org)
- [Three.js Documentation](https://threejs.org/docs)
- [CSS-Tricks](https://css-tricks.com)
- [Web.dev](https://web.dev)

### Tools

- [WebPageTest](https://www.webpagetest.org)
- [PageSpeed Insights](https://pagespeed.web.dev)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)

## 🎓 Principes de Conception

### DRY (Don't Repeat Yourself)

```javascript
// ❌ Répétition
element1.addEventListener('click', () => { /* ... */ });
element2.addEventListener('click', () => { /* ... */ });
element3.addEventListener('click', () => { /* ... */ });

// ✅ DRY
[element1, element2, element3].forEach(el => {
    el.addEventListener('click', handleClick);
});
```

### KISS (Keep It Simple, Stupid)

```javascript
// ❌ Complexe
const result = (a, b, c) => 
    a > 0 ? (b > 0 ? (c > 0 ? a + b + c : a + b - c) : a - b + c) : -a;

// ✅ Simple
function calculate(a, b, c) {
    const sum = a + b + c;
    return a > 0 ? sum : -sum;
}
```

### SOLID Principles

- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

---

**Dernière mise à jour**: 2024
**Mainteneur**: Votre Nom
