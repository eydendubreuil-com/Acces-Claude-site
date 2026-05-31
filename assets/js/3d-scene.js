/* ============================
   Scène 3D avec Three.js
   ============================ */

class Scene3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.animationId = null;
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.createParticles();
        this.createGeometry();
        this.setupLights();
        this.setupEventListeners();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e27);
        this.scene.fog = new THREE.Fog(0x0a0e27, 100, 1000);
    }

    setupCamera() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const fov = 75;
        const aspect = width / height;
        const near = 0.1;
        const far = 1000;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.z = 30;
    }

    setupRenderer() {
        const canvas = document.getElementById('canvas-3d');
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createParticles() {
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 200;
            positions[i + 1] = (Math.random() - 0.5) * 200;
            positions[i + 2] = (Math.random() - 0.5) * 200;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x667eea,
            size: 0.5,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.6
        });

        const pointCloud = new THREE.Points(geometry, material);
        this.scene.add(pointCloud);
        this.pointCloud = pointCloud;
    }

    createGeometry() {
        // Créer des géométries 3D interactives
        
        // Cube rotatif
        const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
        const cubeMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x667eea,
            emissive: 0x2a2e5a,
            wireframe: false
        });
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.cube.position.x = -20;
        this.cube.castShadow = true;
        this.scene.add(this.cube);

        // Sphère rotatrice
        const sphereGeometry = new THREE.SphereGeometry(8, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xf093fb,
            emissive: 0x5a2a5a,
            wireframe: false
        });
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position.x = 20;
        this.sphere.castShadow = true;
        this.scene.add(this.sphere);

        // Torus au centre
        const torusGeometry = new THREE.TorusGeometry(12, 3, 16, 100);
        const torusMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x764ba2,
            emissive: 0x3a2a5a,
            wireframe: false
        });
        this.torus = new THREE.Mesh(torusGeometry, torusMaterial);
        this.torus.castShadow = true;
        this.scene.add(this.torus);

        // Cône
        const coneGeometry = new THREE.ConeGeometry(6, 12, 32);
        const coneMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x00ff88,
            emissive: 0x00aa44,
            wireframe: false
        });
        this.cone = new THREE.Mesh(coneGeometry, coneMaterial);
        this.cone.position.z = -15;
        this.cone.castShadow = true;
        this.scene.add(this.cone);

        // Icosaèdre
        const icoGeometry = new THREE.IcosahedronGeometry(8, 4);
        const icoMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff6b6b,
            emissive: 0x882222,
            wireframe: false
        });
        this.ico = new THREE.Mesh(icoGeometry, icoMaterial);
        this.ico.position.z = 15;
        this.ico.castShadow = true;
        this.scene.add(this.ico);
    }

    setupLights() {
        // Lumière ambiante
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // Lumière directionnelle
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Lumière ponctuelle
        const pointLight = new THREE.PointLight(0x667eea, 1);
        pointLight.position.set(0, 0, 20);
        this.scene.add(pointLight);

        // Lumière ponctuelle 2
        const pointLight2 = new THREE.PointLight(0xf093fb, 0.8);
        pointLight2.position.set(0, 0, -20);
        this.scene.add(pointLight2);
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('resize', () => this.onWindowResize());
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Rotation des objets
        if (this.cube) {
            this.cube.rotation.x += 0.005;
            this.cube.rotation.y += 0.005;
        }

        if (this.sphere) {
            this.sphere.rotation.x += 0.003;
            this.sphere.rotation.y += 0.008;
        }

        if (this.torus) {
            this.torus.rotation.x += 0.004;
            this.torus.rotation.z += 0.006;
        }

        if (this.cone) {
            this.cone.rotation.x += 0.002;
            this.cone.rotation.z += 0.005;
        }

        if (this.ico) {
            this.ico.rotation.x += 0.006;
            this.ico.rotation.y += 0.004;
        }

        // Rotation basée sur la souris
        if (this.cube) {
            this.cube.rotation.y += (this.mouse.x * 0.5 - this.cube.rotation.y) * 0.05;
            this.cube.rotation.x += (this.mouse.y * 0.5 - this.cube.rotation.x) * 0.05;
        }

        // Animer les particules
        if (this.pointCloud) {
            this.pointCloud.rotation.x += 0.0001;
            this.pointCloud.rotation.y += 0.0002;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    // Méthodes de contrôle
    pause() {
        cancelAnimationFrame(this.animationId);
    }

    resume() {
        this.animate();
    }

    changeBackgroundColor(color) {
        this.scene.background = new THREE.Color(color);
    }

    addObject(geometry, material, position) {
        const mesh = new THREE.Mesh(geometry, material);
        if (position) {
            mesh.position.copy(position);
        }
        this.scene.add(mesh);
        return mesh;
    }

    removeObject(object) {
        this.scene.remove(object);
    }

    // Créer une onde/ripple au clic
    createRipple(position) {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x667eea,
            transparent: true,
            opacity: 0.6
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.copy(position);
        this.scene.add(sphere);

        // Animation d'expansion
        const startTime = Date.now();
        const animateRipple = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / 500; // 500ms d'animation

            if (progress < 1) {
                sphere.scale.set(progress * 5, progress * 5, progress * 5);
                material.opacity = 0.6 * (1 - progress);
                requestAnimationFrame(animateRipple);
            } else {
                this.scene.remove(sphere);
            }
        };

        animateRipple();
    }
}

// Initialiser la scène 3D
let scene3D = null;

window.addEventListener('load', () => {
    scene3D = new Scene3D();
    window.scene3D = scene3D;
});

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    if (scene3D) {
        scene3D.onWindowResize();
    }
});
