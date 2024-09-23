import * as THREE from 'three';
import gsap from 'gsap';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Scene
const scene = new THREE.Scene();

// Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  roughness: 0.2,
  metalness: 0.1
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Lights
const dLight = new THREE.DirectionalLight(0xffffff, 1);
dLight.position.set(5, 10, 5);
scene.add(dLight);

// Hemisphere light for soft ambient light from the environment
const hLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
scene.add(hLight);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 15;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Resize listener
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

// Render loop
const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1});
tl.fromTo('nav', {y: '-100%'}, {y: '0%'})
tl.fromTo('h1', {y: '100%'}, {y: '0%'})
