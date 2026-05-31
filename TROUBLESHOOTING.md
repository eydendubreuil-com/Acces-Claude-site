# 🔧 Troubleshooting Avancé

Guide complet pour résoudre les problèmes courants et avancés.

## 🚨 Problèmes Courants

### Le site ne charge pas

**Symptômes:**
- Page blanche
- Erreur 404
- Connexion refusée

**Solutions:**

1. **Vérifiez le serveur:**
```bash
# Testez si le serveur écoute
curl http://localhost:8000

# Vérifiez le port
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows
```

2. **Vérifiez les fichiers:**
```bash
# Listez les fichiers
ls -la
file index.html
```

3. **Vérifiez les permissions:**
```bash
# Donner les permissions de lecture
chmod 644 *.html
chmod 755 assets/
```

### Animations ne fonctionnent pas

**Symptômes:**
- Les éléments n'apparaissent pas
- Les animations sont figées
- Pas de transitions

**Solutions:**

1. **Vérifiez le CSS:**
```javascript
// Console - Vérifier si les styles sont appliqués
const element = document.querySelector('.fade-in');
const styles = window.getComputedStyle(element);
console.log(styles.animation);
```

2. **Vérifiez les classes:**
```javascript
// Console - Lister toutes les classes
document.querySelectorAll('[class*="fade"]').forEach(el => {
    console.log(el.className);
});
```

3. **Vérifiez les keyframes:**
```css
/* Dans le console Chrome -> Elements -> Styles */
/* Recherchez les animations dans le CSS */
```

4. **Réinitialiser le cache:**
- Chrome: Ctrl+Shift+Delete (ou Cmd+Shift+Delete)
- Firefox: Ctrl+Shift+Delete
- Safari: Cmd+Option+E

### Scène 3D ne s'affiche pas

**Symptômes:**
- Canvas noir
- Erreurs WebGL
- Rien ne s'affiche

**Solutions:**

1. **Vérifiez Three.js:**
```javascript
// Console
console.log(THREE); // Doit afficher l'objet Three.js
```

2. **Vérifiez WebGL:**
```javascript
// Console
const canvas = document.getElementById('canvas-3d');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
console.log(gl ? 'WebGL OK' : 'WebGL NOT SUPPORTED');
```

3. **Vérifiez les erreurs:**
```javascript
// Console - Vérifier scene3D
console.log(window.scene3D);
console.log(window.scene3D?.scene);
console.log(window.scene3D?.camera);
```

4. **Vérifiez la résolution:**
```javascript
// Console
console.log(window.innerWidth, window.innerHeight);
scene3D?.onWindowResize();
```

### Performance lente

**Symptômes:**
- Scroll saccadé
- Animations stuttering
- CPU/GPU haute

**Solutions:**

1. **Profiler le code:**
```javascript
// Chrome DevTools → Performance → Record
// Puis Ctrl+P pour capturer
```

2. **Réduire les particules:**
```javascript
// Dans 3d-scene.js
const particleCount = 500; // Au lieu de 1000
```

3. **Désactiver les ombres:**
```javascript
// Dans 3d-scene.js - setupRenderer()
this.renderer.shadowMap.enabled = false;
```

4. **Vérifier la charge:**
```javascript
// Console
window.showStats()
```

## 🎯 Débogage Avancé

### Activer le Debug Mode

```javascript
// Console
window.app.toggleDebugMode(true);

// Ou
app.toggleDebugMode(true);

// Ou raccourci clavier
// Ctrl+Shift+D
```

### Inspecter les Objects

```javascript
// Voir la scène 3D
console.log(window.scene3D);

// Voir le gestionnaire parallax
console.log(window.parallaxManager);

// Voir les éléments observés
console.log(window.scrollEffectManager.elements);

// Voir l'app
console.log(window.app);
```

### Vérifier les Events

```javascript
// Console - Écouter tous les events
document.addEventListener('reveal', (e) => {
    console.log('Reveal event:', e.detail);
});

// Émettre un event test
document.dispatchEvent(new CustomEvent('reveal', { 
    detail: document.body 
}));
```

### Mesurer les Performances

```javascript
// Console
console.time('operation');
// ... faire quelque chose ...
console.timeEnd('operation');

// Ou
window.performanceMonitor?.startMeasure('test');
// ... faire quelque chose ...
const duration = window.performanceMonitor?.endMeasure('test');
console.log(`Durée: ${duration}ms`);
```

## 📊 Profiling

### Chrome DevTools Performance

1. Ouvrez DevTools (F12)
2. Allez à l'onglet "Performance"
3. Cliquez "Record"
4. Interagissez avec la page
5. Cliquez "Stop"
6. Analysez le graphe

### Memory Leaks

```javascript
// Déterminer les fuites mémoire
// Chrome DevTools → Memory → Take Heap Snapshot
// Comparez avant/après

// Pour libérer les ressources
scene3D?.pause();
parallaxManager?.destroy?.();
```

### Network Performance

```javascript
// Chrome DevTools → Network
// Vérifiez le temps de chargement des ressources

// Ou via JavaScript
performance.getEntriesByType('resource').forEach(r => {
    console.log(r.name, r.duration, 'ms');
});
```

## 🌐 Issues de Navigateur

### Chrome

**Problème:** Les animations sont saccadées
```
Solutions:
1. Désactiver les extensions
2. Vérifier la GPU acceleration: chrome://gpu
3. Utiliser le Incognito Mode pour tester
```

### Firefox

**Problème:** WebGL ne fonctionne pas
```
Solutions:
1. about:config → webgl.enabled = true
2. Vérifier la version de Firefox
3. Mettre à jour les drivers GPU
```

### Safari

**Problème:** Performances faibles
```
Solutions:
1. Preferences → Advanced → Develop Menu
2. Désactiver "Web Inspector" si non nécessaire
3. Vérifier la version iOS/macOS
```

### Edge

**Problème:** Three.js ne charge pas
```
Solutions:
1. Vérifier la version
2. Désactiver les extensions
3. Vider le cache
```

## 📱 Issues Mobile

### Performance Mobile

```javascript
// Détecter si mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Réduire les animations sur mobile
if (isMobile) {
    parallaxManager.setParallaxStrength(5); // Au lieu de 20
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
}
```

### Touch Events

```javascript
// Ajouter support touch
document.addEventListener('touchmove', (e) => {
    // Gérer le scroll tactile
}, { passive: true });

document.addEventListener('touchend', (e) => {
    // Gérer la fin du touch
});
```

### Viewport Meta Tag

```html
<!-- Assurez-vous que c'est présent -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 🔌 Issues d'Intégration

### Three.js CDN ne charge pas

```html
<!-- Alternative CDN -->
<script src="https://unpkg.com/three@r128/build/three.min.js"></script>

<!-- Ou localement -->
<script src="assets/libs/three.min.js"></script>
```

### Conflits CSS

```css
/* Utiliser des namespaces */
.immersive-app-section { }
.immersive-app-button { }

/* Éviter les sélecteurs globaux */
/* ❌ */
button { background: blue; }

/* ✅ */
.immersive-app-button { background: blue; }
```

### Conflits JavaScript

```javascript
// Vérifier les collisions
console.log(window.app); // Voir s'il existe
console.log(window.THREE); // Voir si Three.js existe

// Utiliser des modules
// export class AnimationManager { }
// import { AnimationManager } from './modules';
```

## 🔍 Debugging Avancé

### Inspecting DOM

```javascript
// Console
// Sélectionner un élément
const element = document.querySelector('.section');

// Inspecter ses propriétés
console.dir(element);

// Voir ses computed styles
console.log(getComputedStyle(element));

// Voir ses événements (Chrome only)
getEventListeners(element);
```

### Conditional Breakpoints

```javascript
// Ajouter un breakpoint conditionnel
// Chrome DevTools → Sources → Ajouter un breakpoint
// Clic droit → Edit breakpoint → Ajouter la condition

// Exemple de condition
scrollY > 1000 && scrollY < 2000
```

### Watch Expressions

```javascript
// Chrome DevTools → Sources → Watch
// Ajouter des expressions à surveiller

// Exemples
document.scrollingElement.scrollTop
window.innerWidth
window.app?.config
```

## 🧹 Nettoyage et Optimisation

### Memory Cleanup

```javascript
// Avant de quitter
function cleanup() {
    // Supprimer les event listeners
    document.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
    
    // Détruire les objets
    scene3D?.pause();
    
    // Vider les arrays
    parallaxManager.elements = [];
    
    // Vider les références
    window.app = null;
}
```

### Resource Cleanup

```javascript
// Arrêter les animations
scene3D?.pause();

// Arrêter les timers
clearInterval(intervalId);
clearTimeout(timeoutId);

// Annuler les requêtes
abortController?.abort();
```

## 📝 Logging Stratégique

```javascript
// Créer un système de logging
const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
};

function log(level, message, data) {
    if (level >= (CONFIG.logLevel || LOG_LEVELS.INFO)) {
        console.log(`[${level}] ${message}`, data);
    }
}

// Utilisation
log(LOG_LEVELS.DEBUG, 'Animation started', { duration: 600 });
log(LOG_LEVELS.ERROR, 'Failed to load', { error: err });
```

## 🎯 Checklist de Débogage

- [ ] Ouvrez la console (F12)
- [ ] Cherchez les erreurs rouges
- [ ] Vérifiez les warnings orange
- [ ] Testez sur multiple navigateurs
- [ ] Testez sur mobile
- [ ] Vérifiez les performances
- [ ] Vérifiez la mémoire
- [ ] Vérifiez le réseau
- [ ] Testez avec DevTools throttling
- [ ] Documentez la solution

## 📞 Ressources d'Aide

- [MDN Web Docs](https://developer.mozilla.org)
- [Chrome DevTools Docs](https://developer.chrome.com/docs/devtools)
- [Stack Overflow - javascript tag](https://stackoverflow.com/questions/tagged/javascript)
- [Three.js Forum](https://discourse.threejs.org)
- [GitHub Issues](https://github.com)

---

**Dernière mise à jour**: 2024
