# Assets Guide

Ce dossier contient toutes les ressources pour votre expérience immersive 3D.

## 📁 Structure des Assets

### 📁 js/ - JavaScript Files

- **main.js** - Application principale (ImmersiveApp)
- **utils.js** - Utilitaires réutilisables
- **parallax.js** - Gestionnaire d'effets parallax
- **scrollEffects.js** - Gestionnaire d'animations au scroll
- **3d-scene.js** - Scène 3D avec Three.js
- **config.js** - Configuration avancée et hooks

**Taille totale JS:** ~2000 lignes

### 🎨 css/ - Stylesheet Files

- **styles.css** - Styles principaux et layout
- **animations.css** - Animations CSS et keyframes

**Taille totale CSS:** ~1500 lignes

### 🖼️ images/ - Images and Graphics

Placez vos images ici:
- `.png` - Pour les graphics avec transparence
- `.jpg` - Pour les photos
- `.webp` - Pour les images compressées (modern browsers)
- `.svg` - Pour les graphiques vectoriels

**Recommandations:**
- Optimisez la taille: < 100KB par image
- Utilisez des formats modernes (WebP)
- Respectez les dimensions (16:9 pour les backgrounds)

### 🎭 models/ - 3D Models

Placez vos modèles 3D ici:
- `.gltf` / `.glb` - Formats Three.js recommandés
- `.obj` / `.mtl` - Formats OBJ
- `.fbx` - Formats Autodesk
- `.dae` - Formats COLLADA

**Comment charger des modèles:**

```javascript
// Dans 3d-scene.js
const loader = new THREE.GLTFLoader();
loader.load('assets/models/mon-modele.glb', (gltf) => {
    const model = gltf.scene;
    this.scene.add(model);
});
```

### 🔊 audio/ - Audio Files

Placez vos fichiers audio ici:
- `.mp3` - Audio compressé
- `.wav` - Audio non-compressé
- `.ogg` - Audio alternatif
- `.webm` - Audio pour le web

**Comment intégrer de l'audio:**

```html
<!-- HTML -->
<audio controls>
    <source src="assets/audio/musique.mp3" type="audio/mpeg">
</audio>
```

```javascript
// JavaScript
const audio = new Audio('assets/audio/sound.mp3');
audio.play();
```

## 📋 Conventions de Nommage

### Images
```
hero-banner.png
section-background.jpg
icon-play.svg
texture-metal.webp
```

### Modèles 3D
```
cube-animated.glb
sphere-texture.glb
environment.glb
character-rigged.fbx
```

### Audio
```
background-music.mp3
click-sound.wav
hover-effect.ogg
transition-whoosh.webm
```

## 🎯 Optimisations

### Images

```bash
# Compresser avec ImageMagick
convert image.png -strip -quality 85% image-optimized.png

# Ou utiliser en ligne: TinyPNG, imageOptim
```

### Modèles 3D

```bash
# Optimiser les modèles GLTF
# Utilisez gltf-pipeline ou Babylon.js
npx gltf-pipeline -i model.glb -o model-optimized.glb
```

### Audio

```bash
# Compresser MP3
ffmpeg -i input.wav -q:a 5 output.mp3

# Convertir vers ogg
ffmpeg -i input.mp3 -c:a libvorbis -q:a 5 output.ogg
```

## 📊 Limites Recommandées

| Type | Max Size | Format |
|------|----------|--------|
| Images | 200KB | WebP, PNG, JPEG |
| Models 3D | 5MB | GLTF/GLB |
| Audio | 1MB | MP3, OGG |
| Total | 50MB | - |

## 🚀 Chargement Optimisé

### Lazy Loading Images

```html
<img src="image.png" loading="lazy" alt="Description">
```

### Lazy Loading Models

```javascript
let modelLoaded = false;

// Charger le modèle uniquement quand visible
onSectionEnter('3d-section', () => {
    if (!modelLoaded) {
        loadModel('assets/models/mon-modele.glb');
        modelLoaded = true;
    }
});
```

### Preloading Critique

```html
<!-- Head section -->
<link rel="preload" as="image" href="assets/images/hero.jpg">
<link rel="preload" as="script" href="assets/js/main.js">
```

## 📱 Assets Responsifs

### Images Responsifs

```html
<picture>
    <source media="(max-width: 600px)" srcset="assets/images/small.jpg">
    <source media="(min-width: 601px)" srcset="assets/images/large.jpg">
    <img src="assets/images/fallback.jpg" alt="Image">
</picture>
```

### SRCSET

```html
<img 
    src="assets/images/image.jpg"
    srcset="assets/images/image-mobile.jpg 480w,
            assets/images/image-tablet.jpg 768w,
            assets/images/image-desktop.jpg 1920w"
    alt="Image responsif">
```

## 🔐 Sécurité des Assets

### Vérification de Source

```javascript
// Vérifier que les assets viennent de votre serveur
const allowedOrigins = ['yourdomain.com'];

fetch('assets/images/image.jpg')
    .then(r => {
        const origin = new URL(r.url).origin;
        if (!allowedOrigins.includes(origin)) {
            throw new Error('Asset from untrusted source');
        }
        return r.blob();
    });
```

### Compression d'Assets

```bash
# Créer un build optimisé
mkdir -p dist/assets
cp -r assets/* dist/assets/

# Minifier CSS
npx cleancss assets/css/*.css -o dist/assets/css/main.min.css

# Minifier JS
npx terser assets/js/*.js -o dist/assets/js/main.min.js

# Compresser images
npx imagemin assets/images/* --out-dir=dist/assets/images
```

## 📖 Exemples d'Utilisation

### Ajouter une Image de Fond

```css
.section {
    background-image: url('../images/background.jpg');
    background-size: cover;
    background-position: center;
}
```

### Ajouter un Modèle 3D

```javascript
// Dans 3d-scene.js - createGeometry()
const loader = new THREE.GLTFLoader();
loader.load('assets/models/my-model.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    this.scene.add(model);
});
```

### Ajouter de la Musique de Fond

```html
<audio autoplay loop volume="0.5">
    <source src="assets/audio/background-music.mp3" type="audio/mpeg">
</audio>
```

## 🎵 Ressources Libres

### Images
- [Unsplash](https://unsplash.com) - Photos haute résolution
- [Pexels](https://pexels.com) - Images gratuites
- [Pixabay](https://pixabay.com) - Images et vidéos

### Modèles 3D
- [Sketchfab](https://sketchfab.com) - Modèles 3D
- [TurboSquid Free](https://www.turbosquid.com) - Assets 3D
- [CGTrader Free](https://www.cgtrader.com) - Modèles 3D

### Audio
- [Freepik Audio](https://www.freepik.com/audio) - Musique libre
- [Pixabay Audio](https://pixabay.com/music) - Sons et musique
- [Zapsplat](https://www.zapsplat.com) - Effets sonores

### Fonts
- [Google Fonts](https://fonts.google.com) - Polices gratuites
- [Font Awesome](https://fontawesome.com) - Icônes

---

**Guide des Assets | Mise à jour: 2024**
