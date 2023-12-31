import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

//Scene
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/alphaSnow.jpg")
//Debugging
// const gui = new dat.GUI();

//Resizing
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Mesh
const geometry = new THREE.BufferGeometry();
const verticesAmount = 8000
const positions = new Float32Array(verticesAmount * 3);
for (let i = 0; i < verticesAmount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 6;
}
geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const material = new THREE.PointsMaterial();
material.size = 0.02;
material.alphaMap = particleTexture;
material.transparent = true;
material.depthTest = false;
const points = new THREE.Points(geometry, material);
scene.add(points);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 0.01, 100);
camera.position.z = 2;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom = false;
orbitControls.enableRotate = false;
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.5;
//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  // * animate particles 
  // points.rotation.y = elapsedTime * -0.1;
  // points.rotation.x = elapsedTime * 0.2;
  // points.rotation.x = Math.sin(elapsedTime * 0.2);
  // points.rotation.x = Math.tan(elapsedTime * 0.2);

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
