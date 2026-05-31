# 🚀 Guide de Démarrage Rapide

Bienvenue dans la base d'expérience immersive 3D! Ce guide vous permettra de commencer rapidement.

## 📋 Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un éditeur de texte ou IDE (VS Code recommandé)
- Git (optionnel)

## ⚡ Démarrage Rapide

### 1. Ouvrir le projet

```bash
cd Acces-Claude-site
```

### 2. Lancer un serveur local

**Option 1: Avec Python (inclus sur Mac/Linux)**
```bash
python -m http.server 8000
```

**Option 2: Avec Node.js**
```bash
npx http-server
```

**Option 3: Avec VS Code Live Server**
- Cliquez droit sur `index.html`
- Sélectionnez "Open with Live Server"

### 3. Ouvrir dans le navigateur

Accédez à `http://localhost:8000` (ou le port affiché dans votre terminal)

## 🎯 Structure des Fichiers

```
├── index.html                    # Page principale
├── examples.html                 # Exemples avancés
├── assets/
│   ├── css/
│   │   ├── styles.css           # Styles principaux
│   │   └── animations.css       # Animations CSS
│   ├── js/
│   │   ├── main.js              # Application principale
│   │   ├── utils.js             # Fonctions utilitaires
│   │   ├── parallax.js          # Effets parallax
│   │   ├── scrollEffects.js     # Effets au scroll
│   │   ├── 3d-scene.js          # Scène 3D (Three.js)
│   │   └── config.js            # Configuration avancée
│   ├── images/                  # Vos images
│   ├── models/                  # Modèles 3D
│   └── audio/                   # Fichiers audio
├── package.json                 # Dépendances npm
└── README.md                    # Documentation complète
```

## 🎨 Personnaliser Votre Site

### Ajouter une Section

1. Ouvrez `index.html`
2. Ajoutez une nouvelle section avant le `</div>` de fermeture:

```html
<section id="ma-section" class="section">
    <h2 class="section-title fade-in">Mon Titre</h2>
    <p class="fade-in-up">Mon contenu</p>
</section>
```

### Ajouter une Animation

Utilisez l'une des classes d'animation:

```html
<div class="fade-in">Apparition avec fade</div>
<div class="fade-in-up">Slide in de bas</div>
<div class="fade-in-left">Slide in de gauche</div>
<div class="scale-in">Zoom in</div>
<div class="rotate-in">Rotation</div>
```

### Ajouter du Parallax

```html
<h2 data-parallax="0.5">Titre avec parallax</h2>
<p data-parallax="0.3">Paragraphe avec parallax</p>
```

Plus la valeur est élevée, plus l'effet est prononcé.

## 🌐 Commandes Console Utiles

Ouvrez la console du navigateur (F12) et tapez:

```javascript
// Afficher les statistiques
showStats()

// Naviguer vers une section
goto('section-3')

// Modifier la force du parallax
app.setParallaxStrength(30)

// Activer le debug mode
app.toggleDebugMode(true)

// Accéder à la scène 3D
scene3D.changeBackgroundColor(0x000000)

// Ajouter un objet 3D
// Scene3D... (voir documentation avancée)
```

## 📚 Exemples Simples

### Exemple 1: Section avec Animation

```html
<section class="section">
    <h2 class="section-title fade-in">Bienvenue</h2>
    <p class="fade-in-up" style="animation-delay: 0.2s;">
        Contenu animé
    </p>
</section>
```

### Exemple 2: Carte Animée

```html
<div class="scroll-card fade-in-up">
    <div class="card-icon">🎨</div>
    <h3>Titre</h3>
    <p>Description de la carte</p>
</div>
```

### Exemple 3: Timeline

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <h4>2024</h4>
        <p>Description</p>
    </div>
</div>
```

## 🎮 Contrôles Clavier

| Touche | Action |
|--------|--------|
| **Espace** | Scroll vers le bas |
| **↑** | Scroll vers le haut |
| **↓** | Scroll vers le bas |
| **Ctrl+Shift+D** | Activer debug mode |

## 🔧 Dépannage

### Le site ne s'affiche pas

- Vérifiez que le serveur est en cours d'exécution
- Vérifiez l'adresse: `http://localhost:8000`
- Vérifiez la console du navigateur (F12) pour les erreurs

### Les animations ne fonctionnent pas

- Vérifiez que `animations.css` est chargé
- Vérifiez que JavaScript est activé
- Utilisez `app.toggleDebugMode(true)` pour inspecter

### La scène 3D ne s'affiche pas

- Vérifiez que Three.js est chargé (vérifier les sources)
- Vérifiez que WebGL est supporté
- Ouvrez la console pour voir les erreurs

### Performance faible

- Réduisez le nombre d'animations
- Désactivez les ombres 3D si nécessaire
- Fermez d'autres onglets/applications

## 🚀 Prochaines Étapes

1. **Personnalisez les couleurs** - Modifiez `assets/css/styles.css`
2. **Ajoutez du contenu** - Modifiez `index.html`
3. **Créez des animations** - Utilisez les classes CSS ou JavaScript
4. **Explorez les exemples** - Ouvrez `examples.html`
5. **Déployez votre site** - Uploadez sur un serveur web

## 📖 Ressources Utiles

- **Three.js Documentation**: https://threejs.org/docs/
- **MDN Web Docs**: https://developer.mozilla.org/
- **CSS Animations**: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
- **WebGL Performance**: https://www.khronos.org/webgl/

## 💡 Conseils Professionnels

1. **Testez sur mobile** - Utilisez DevTools (F12) > Toggle device toolbar
2. **Optimisez les images** - Compressez vos images
3. **Utilisez le Lazy Loading** - Pour les images
4. **Minifiez votre CSS/JS** - Pour la production
5. **Testez les navigateurs** - Sur différents navigateurs

## 🎓 Tutoriels Vidéo Recommandés

- Three.js Basics - YouTube
- CSS Animations - FreeCodeCamp
- WebGL Introduction - The Coding Train
- Web Performance - Google DevTools

## 📞 Support

Si vous avez des questions:
1. Vérifiez la documentation complète dans `README.md`
2. Consultez les exemples dans `examples.html`
3. Ouvrez une issue sur GitHub

## 🎉 Félicitations!

Vous êtes prêt à créer votre expérience immersive 3D! 🚀

N'hésitez pas à explorer et à créer. L'univers créatif n'a pas de limites!

---

**Besoin de plus d'aide?** Consultez le [README.md](./README.md) pour la documentation complète.
