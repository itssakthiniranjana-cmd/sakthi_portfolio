/**
 * Three.js 3D WebGL Glass Sculpture & Interactive Scene
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - Floating translucent 3D glass sculpture & geometric monogram
 * - Chromatic reflection, iridescence, and refractive lighting
 * - Mouse parallax & inertia tracking
 * - Dynamic scroll translation & perspective rotation
 * - Subtle ambient particle field
 */

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

class HeroThreeScene {
  constructor(canvasId = 'hero-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.sculptureGroup = null;
    this.particles = null;
    this.pointLight = null;
    this.cursorLight = null;

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.scrollY = 0;

    this.clock = new THREE.Clock();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight || window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // 4. Lighting System
    this.setupLights();

    // 5. Build 3D Sculptural Glass Composition
    this.buildSculpture();

    // 6. Build Ambient Particle Field
    this.buildParticles();

    // 7. Event Listeners
    this.addEvents();

    // 8. Start Animation Loop
    this.animate();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xf0ecfc, 1.2);
    this.scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(5, 8, 6);
    this.scene.add(mainLight);

    const violetLight = new THREE.PointLight(0x7c3aed, 3.5, 20);
    violetLight.position.set(-4, -2, 3);
    this.scene.add(violetLight);

    const indigoLight = new THREE.PointLight(0x4f46e5, 3.0, 20);
    indigoLight.position.set(4, 3, -2);
    this.scene.add(indigoLight);

    const warmAccentLight = new THREE.PointLight(0xf59e0b, 1.8, 15);
    warmAccentLight.position.set(0, -5, 4);
    this.scene.add(warmAccentLight);

    // Interactive cursor follow light
    this.cursorLight = new THREE.PointLight(0x6366f1, 2.5, 12);
    this.cursorLight.position.set(0, 0, 3);
    this.scene.add(this.cursorLight);
  }

  buildSculpture() {
    this.sculptureGroup = new THREE.Group();

    // Translucent Glass Physical Material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.12,
      ior: 1.52,
      thickness: 1.8,
      specularIntensity: 1.0,
      specularColor: 0xffffff,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      iridescence: 0.85,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [100, 400]
    });

    // Outer Torus Knot Core Sculpture
    const knotGeometry = new THREE.TorusKnotGeometry(1.65, 0.42, 160, 32, 2, 3);
    const knotMesh = new THREE.Mesh(knotGeometry, glassMaterial);
    knotMesh.castShadow = true;
    knotMesh.receiveShadow = true;
    this.sculptureGroup.add(knotMesh);

    // Inner Floating Iridescent Core Sphere
    const innerSphereGeo = new THREE.SphereGeometry(0.75, 48, 48);
    const innerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerMaterial);
    this.sculptureGroup.add(innerSphere);

    // Orbiting Dimensional Rings
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.035, 24, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x4338ca,
      emissiveIntensity: 0.2
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    this.sculptureGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.65, 0.025, 24, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.2
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 4;
    this.sculptureGroup.add(ringMesh2);

    // Offset position to right side on desktop for editorial typography balance
    if (window.innerWidth > 900) {
      this.sculptureGroup.position.set(1.6, 0.1, 0);
    } else {
      this.sculptureGroup.position.set(0, -0.5, -1.0);
      this.sculptureGroup.scale.set(0.75, 0.75, 0.75);
    }

    this.scene.add(this.sculptureGroup);
  }

  buildParticles() {
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      scales[i] = Math.random() * 0.05 + 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.06,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  addEvents() {
    window.addEventListener('resize', this.onResize.bind(this));

    window.addEventListener('mousemove', (e) => {
      // Normalize mouse coordinates to [-1, 1]
      this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Device orientation support for mobile gyroscope tilt
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          this.targetMouseX = THREE.MathUtils.clamp(e.gamma / 30, -1, 1);
          this.targetMouseY = THREE.MathUtils.clamp((e.beta - 45) / 30, -1, 1);
        }
      });
    }

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY || window.pageYOffset;
    });
  }

  onResize() {
    if (!this.canvas || !this.renderer || !this.camera) return;
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (this.sculptureGroup) {
      if (window.innerWidth > 900) {
        this.sculptureGroup.position.set(1.6, 0.1, 0);
        this.sculptureGroup.scale.set(1, 1, 1);
      } else {
        this.sculptureGroup.position.set(0, -0.6, -1.0);
        this.sculptureGroup.scale.set(0.72, 0.72, 0.72);
      }
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Lerp mouse coordinates for smooth inertia
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Interactive cursor follow light movement in 3D
    if (this.cursorLight) {
      this.cursorLight.position.x = this.mouseX * 4;
      this.cursorLight.position.y = this.mouseY * 3;
    }

    // Sculpture Idle & Scroll Rotation
    if (this.sculptureGroup && !this.isReducedMotion) {
      this.sculptureGroup.rotation.x = elapsedTime * 0.25 + this.mouseY * 0.5 + (this.scrollY * 0.001);
      this.sculptureGroup.rotation.y = elapsedTime * 0.35 + this.mouseX * 0.6 + (this.scrollY * 0.0015);
      this.sculptureGroup.rotation.z = Math.sin(elapsedTime * 0.2) * 0.15;

      // Floating breathing bob
      const basePosX = window.innerWidth > 900 ? 1.6 : 0;
      const basePosY = window.innerWidth > 900 ? 0.1 : -0.6;
      this.sculptureGroup.position.y = basePosY + Math.sin(elapsedTime * 1.2) * 0.12 + (this.mouseY * 0.3) - (this.scrollY * 0.002);
      this.sculptureGroup.position.x = basePosX + (this.mouseX * 0.35);
    }

    // Ambient particle drift
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.04;
      this.particles.rotation.x = -elapsedTime * 0.02;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

export default HeroThreeScene;
