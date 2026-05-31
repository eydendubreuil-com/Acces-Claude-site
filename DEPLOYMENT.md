# Guide de Déploiement

Ce guide explique comment déployer votre expérience immersive 3D en ligne.

## Options de Déploiement

### 1. Netlify (Recommandé - Gratuit & Simple)

**Avantages:**
- Déploiement gratuit et illimité
- HTTPS automatique
- CDN global
- Déploiement continu avec GitHub

**Étapes:**

1. Connectez-vous à [Netlify](https://www.netlify.com/)
2. Cliquez sur "New site from Git"
3. Connectez votre repository GitHub
4. Configurez la build:
   - Build command: `echo 'No build needed'`
   - Publish directory: `.`
5. Cliquez sur "Deploy"

**Alternative - Drag & Drop:**
1. Zip tous vos fichiers
2. Allez sur netlify.com
3. Glissez-déposez le zip

### 2. Vercel (Gratuit & Rapide)

**Avantages:**
- Très rapide
- Gratuit
- Meilleure performance pour Next.js
- Fonctions serverless disponibles

**Étapes:**

1. Connectez-vous à [Vercel](https://vercel.com/)
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Laissez les paramètres par défaut
5. Cliquez sur "Deploy"

### 3. GitHub Pages (Gratuit - Pour projets statiques)

**Avantages:**
- Gratuit
- Intégré à GitHub
- HTTPS automatique

**Étapes:**

1. Créez un repository public sur GitHub
2. Poussez vos fichiers:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votre-nom/votre-repo.git
git push -u origin main
```

3. Allez dans Settings → Pages
4. Sélectionnez "main" comme source
5. Attendez que le site soit déployé

### 4. Heroku (Gratuit - Avec limitations)

**Étapes:**

1. Installez Heroku CLI
2. Créez un `Procfile`:
```
web: npm start
```

3. Déployez:
```bash
heroku login
heroku create nom-de-votre-app
git push heroku main
```

### 5. AWS S3 + CloudFront

Pour un déploiement professionnel.

**Étapes:**

1. Créez un bucket S3
2. Uploadez vos fichiers
3. Configurez CloudFront CDN
4. Configurez un domaine personnalisé

### 6. HostGator / Bluehost / Other Shared Hosting

**Étapes:**

1. Uploadez via FTP tous vos fichiers
2. Assurez-vous que le serveur supporte les fichiers statiques
3. Accédez via votre domaine

## Optimisation pour la Production

### 1. Minification

**CSS et JavaScript:**
```bash
# Avec npm
npm install --save-dev terser cleancss-cli
```

Créez un script dans `package.json`:
```json
"scripts": {
  "build": "terser assets/js/*.js -o dist/main.min.js && cleancss assets/css/*.css -o dist/main.min.css"
}
```

### 2. Compression d'Images

```bash
# Avec ImageOptim (Mac)
# Ou avec TinyPNG online
# Ou avec ImageMagick (Linux)
convert image.png -strip -quality 85% image-compressed.png
```

### 3. Cache Busting

Ajoutez un hash de version:
```html
<link rel="stylesheet" href="assets/css/styles.css?v=1.0.1">
<script src="assets/js/main.js?v=1.0.1"></script>
```

### 4. Lazy Loading

```html
<img src="image.png" loading="lazy" alt="Description">
```

### 5. Service Worker (PWA)

Créez `service-worker.js`:
```javascript
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

Enregistrez dans `index.html`:
```javascript
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
</script>
```

## Configuration du Domaine

### 1. Pointer un Domaine Personnalisé

**Chez Netlify:**
1. Settings → Domain management
2. Add domain alias
3. Configurez les DNS chez votre registraire

**Chez Vercel:**
1. Project Settings → Domains
2. Ajoutez votre domaine
3. Suivez les instructions DNS

### 2. Certificat SSL

La plupart des services fournissent le SSL gratuit.

## Performance SEO

### 1. Meta Tags

```html
<meta name="description" content="Expérience immersive 3D révolutionnaire">
<meta name="keywords" content="3D, immersif, animations, parallax">
<meta property="og:title" content="Expérience Immersive 3D">
<meta property="og:description" content="Une expérience visuelle révolutionnaire">
<meta property="og:image" content="https://votre-site.com/og-image.png">
<meta property="og:url" content="https://votre-site.com">
```

### 2. Sitemap

Créez `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://votre-site.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://votre-site.com/examples.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 3. Robots.txt

Créez `robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://votre-site.com/sitemap.xml
```

## Monitoring et Analytics

### 1. Google Analytics

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 2. Monitoring Performance

```html
<!-- Sentry Error Tracking -->
<script src="https://browser.sentry-cdn.com/VERSION/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: 'YOUR_DSN' });
</script>
```

## Variables d'Environnement

Créez `.env` (non versionné):
```
API_URL=https://api.exemple.com
GA_ID=UA-XXXXXXXXX-X
SENTRY_DSN=https://...
```

Utilisez dans `config.js`:
```javascript
const API_URL = process.env.API_URL || 'http://localhost:3000';
```

## Checklist de Déploiement

- [ ] Tous les liens sont relatifs ou absolus corrects
- [ ] Les images sont optimisées
- [ ] Le CSS et JS sont minifiés (optionnel)
- [ ] Les meta tags sont configurés
- [ ] HTTPS est activé
- [ ] Le domaine est configuré
- [ ] Analytics est configuré
- [ ] Les performances sont acceptables (< 3s de chargement)
- [ ] Mobile-friendly check passed
- [ ] Pas de console errors
- [ ] Cache est correctement configuré

## Benchmarks de Performance

Utilisez:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

Cibles:
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Overall Score**: > 90

---

Bon déploiement! 🚀
