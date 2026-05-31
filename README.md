# 🚀 Expérience Immersive 3D

Une base complète pour créer des sites et applications immersives et en 3D avec animations 3D, effets parallax, scroll effects, expérience visuelle et storytelling.

## ✨ Caractéristiques

### 🎨 Animations 3D
- **Three.js** - Moteur 3D WebGL puissant
- Géométries 3D multiples (cubes, sphères, torus, cônes, icosaèdres)
- Particules animées
- Effets de lumière avancés
- Interactions à la souris

### 🌀 Effets Parallax
- Parallax basé sur le scroll
- Parallax basé sur la position de la souris
- Couches multiples avec profondeur
- Performance optimisée

### 📜 Scroll Effects
- Animations déclenchées au scroll
- Fade-in, Slide-in, Scale, Rotate
- Intersection Observer API
- Timeline interactive

### 🎭 Storytelling
- Chapitres narratifs avec animations
- Timeline chronologique
- Contenu immersif et engageant
- Animations en cascade (stagger)

### 📱 Responsive Design
- Adaptation mobile complète
- Optimisé pour tous les appareils
- Performance GPU
- Animations fluides (60 FPS)

## 📁 Structure du Projet

```
Acces-Claude-site/
├── index.html                 # Page principale
├── assets/
│   ├── css/
│   │   ├── styles.css        # Styles globaux
│   │   └── animations.css    # Animations CSS
│   ├── js/
│   │   ├── main.js           # Application principale
│   │   ├── utils.js          # Utilitaires
│   │   ├── parallax.js       # Gestionnaire parallax
│   │   ├── scrollEffects.js  # Effets de scroll
│   │   └── 3d-scene.js       # Scène 3D (Three.js)
│   ├── images/               # Images et assets
│   ├── models/               # Modèles 3D (GLTF, OBJ)
│   └── audio/                # Fichiers audio
└── README.md
```

## 🚀 Utilisation

### Installation

1. Clonez le repository
```bash
git clone <repo-url>
cd Acces-Claude-site
```

2. Lancez un serveur local
```bash
# Avec Python 3
python -m http.server 8000

# Ou avec Node.js
npx http-server

# Ou avec VS Code Live Server
# Cliquez droit sur index.html → Open with Live Server
```

3. Ouvrez `http://localhost:8000` dans votre navigateur

### Configuration de Base

Le fichier `main.js` contient la classe `ImmersiveApp` qui gère toute l'application:

```javascript
// Accéder à l'instance de l'app
console.log(window.app);

// Configuration
app.getConfig();
app.updateConfig({ parallaxStrength: 30 });

// Navigation
window.goto('section-3');

// Debug mode
app.toggleDebugMode(true); // Ou Ctrl+Shift+D
```

## 🎯 Personnalisation

### Ajouter des Animations

#### Animation au scroll
```html
<div class="fade-in-up">Contenu animé</div>
<div class="fade-in-left">Contenu animé</div>
<div class="fade-in-right">Contenu animé</div>
```

#### Classes d'animation disponibles
- `fade-in`, `fade-in-up`, `fade-in-left`, `fade-in-right`
- `scale-in`, `rotate-in`
- `float`, `pulse`, `bounce`, `glow`

### Ajouter du Parallax

```html
<div data-parallax="0.5">Élément avec parallax</div>
<h1 data-parallax="0.3">Titre parallax</h1>
```

La valeur de `data-parallax` contrôle la force de l'effet (0-1).

### Ajouter des Objets 3D

```javascript
// Dans 3d-scene.js, ajouter à createGeometry()
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshPhongMaterial({ color: 0x667eea });
const mesh = new THREE.Mesh(geometry, material);
this.scene.add(mesh);
```

### Modifier les Couleurs

Éditer les variables de couleur dans `assets/css/styles.css`:
```css
:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --accent: #f093fb;
    --dark: #0a0e27;
}
```

## 🎨 Animations CSS Disponibles

### Animations Entrée
- `slideInDown`, `slideInUp`, `slideInLeft`, `slideInRight`
- `fadeIn`, `fadeInUp`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `rotateIn`

### Animations Continues
- `float`, `bounce`, `pulse`, `glow`
- `shimmer`, `spin`
- `rotateX`, `rotateY`, `rotateZ`

### Classes Utilitaires
```html
<div class="fade-in">Fade in animation</div>
<div class="float">Floating animation</div>
<div class="pulse">Pulsing animation</div>
<div class="hover-scale">Scale on hover</div>
```

## 🔧 APIs JavaScript

### Utils
```javascript
Utils.normalize(value, min, max)
Utils.lerp(a, b, t)
Utils.clamp(value, min, max)
Utils.debounce(func, wait)
Utils.throttle(func, limit)
Utils.easeInOut(t)
Utils.getElementPosition(element)
Utils.getViewportDimensions()
```

### Parallax Manager
```javascript
parallaxManager.setParallaxStrength(strength)
parallaxManager.addElement(element, value)
parallaxManager.removeElement(element)
```

### Scroll Effects Manager
```javascript
scrollEffectManager.revealElement(element)
scrollEffectManager.updateScrollElements()
ScrollEffectManager.createScrollParallax(element, speed)
ScrollEffectManager.createScrollFade(element)
ScrollEffectManager.createScrollScale(element, minScale, maxScale)
ScrollEffectManager.createScrollRotate(element, maxRotation)
```

### Scene 3D (Three.js)
```javascript
scene3D.pause()
scene3D.resume()
scene3D.changeBackgroundColor(color)
scene3D.addObject(geometry, material, position)
scene3D.removeObject(object)
scene3D.createRipple(position)
```

## 🎮 Contrôles Clavier

- **Space** - Scroll down
- **Arrow Up** - Scroll up
- **Arrow Down** - Scroll down
- **Escape** - N/A (peut être personnalisé)
- **Ctrl+Shift+D** - Toggle debug mode

## 📊 Performance

### Optimisations Incluses
- GPU acceleration avec `transform` et `will-change`
- Intersection Observer pour les animations au scroll
- `requestAnimationFrame` pour les animations fluides
- Lazy loading des ressources
- Textures optimisées
- Particules managées efficacement

### Métriques
```javascript
window.showStats() // Affiche les métriques de performance
```

## 🌐 Compatibilité

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile (iOS Safari, Chrome Mobile)

## 📚 Ressources

### Three.js
- [Documentation](https://threejs.org/docs/)
- [Examples](https://threejs.org/examples/)

### Animations CSS
- [Animation Timing Functions](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function)
- [Transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

### WebGL Performance
- [GPU Optimization](https://www.khronos.org/webgl/wiki/Performance_Optimization)

## 🛠️ Dépannage

### Les animations ne fonctionnent pas
1. Vérifier que `assets/css/animations.css` est chargé
2. Vérifier les classes CSS appliquées aux éléments
3. Utiliser `window.debug` pour inspecter

### Performance faible
1. Réduire le nombre de particules dans `3d-scene.js`
2. Désactiver les ombres: `renderer.shadowMap.enabled = false`
3. Réduire la résolution du canvas
4. Vérifier les fuites mémoire avec DevTools

### Problèmes 3D
1. Vérifier que Three.js est chargé correctement
2. Vérifier les erreurs WebGL en console
3. Augmenter le `far` plane de la caméra si certains objets disparaissent

## 📝 Exemples

### Créer une Section Custom

```html
<section id="custom-section" class="section">
    <h2 class="section-title fade-in">Mon Titre</h2>
    <p class="fade-in-up" style="animation-delay: 0.2s;">Mon contenu</p>
</section>
```

### Ajouter une Animation Custom

```css
@keyframes customAnimation {
    from {
        opacity: 0;
        transform: rotateY(90deg);
    }
    to {
        opacity: 1;
        transform: rotateY(0deg);
    }
}

.custom-animate {
    animation: customAnimation 0.8s ease-out forwards;
}
```

## 🎓 Tutoriels Vidéo (À Créer)

- Ajouter des modèles 3D custom
- Intégrer des sons et musique
- Créer des interactions avancées
- Performance optimization
- Déploiement en production

## 📄 Licence

MIT - Libre d'utilisation

## 🤝 Contribution

Les contributions sont bienvenues! N'hésitez pas à:
1. Fork le projet
2. Créer une branche pour votre feature
3. Soumettre une Pull Request

## 📧 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

**Créé avec passion et technologie** ✨