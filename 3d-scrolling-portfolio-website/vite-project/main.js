import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// field of view, aspect ratio, frustum near, frustum far
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // Make canvas fullscreen
camera.position.setZ(30);

renderer.render(scene, camera);

// Add a Geometry
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshStandardMaterial( { color: 0x63adf2 } );
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Add a Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,0,0);
scene.add(pointLight);

// Add a LightHelper to see the light's position
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

// Add OrbitControl to look around
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate); // Infinite loop
  
  torusKnot.rotateX(0.005);
  torusKnot.rotateY(0.003);
  torusKnot.rotateZ(0.005);

  controls.update();

  renderer.render(scene, camera);
}

animate();

let stars = [];

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 20, 20);
  let randomColor = Math.floor(Math.random() * 16_777_215);
  const material = new THREE.MeshStandardMaterial({color: randomColor})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
  stars.push(star);
}

Array(100).fill().forEach(addStar);
