import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const space = new THREE.TextureLoader().load("textures/space.jpeg");

const scene = new THREE.Scene();
scene.background = space;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry1 = new THREE.BoxGeometry();
const geometry2 = new THREE.SphereGeometry();
const geometry3 = new THREE.TorusGeometry();

const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material2 = new THREE.MeshPhongMaterial({ color: 0x0000ff });

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('textures/texture.png');
const texture1 = textureLoader.load('textures/texture1.png');

const cube = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({ map: texture1 }));
cube.position.set(0,0,1)
const sphere = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ map: texture }));
sphere.position.set(3,0,0)
const torus = new THREE.Mesh(geometry3, material2);
torus.position.set(-3,0,0)
scene.add(cube);
scene.add(sphere);
scene.add(torus);

const light1 = new THREE.DirectionalLight(0xffffff, 1);
const light2 = new THREE.PointLight(0xffffff, 1);
light1.position.set(5, 5, 5);
light2.position.set(-5, -5, -5);
scene.add(light1);
scene.add(light2);

const loader = new GLTFLoader();
loader.load(
  'models/wraith.glb',  
  function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, -50, -15); 
  },
);

camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.25; 
controls.screenSpacePanning = false; 
controls.maxPolarAngle = Math.PI / 2; 
controls.minDistance = 2; 
controls.maxDistance = 10;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
