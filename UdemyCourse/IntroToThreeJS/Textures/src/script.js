import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

// * Loading manager
// * - Manages the loading of external files
// * - Can be used to create a loading screen
// * - Can be used to output loading progress
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("Started Loading");
};
loadingManager.onLoad = () => {
  console.log("Finished Loading");
};
loadingManager.onProgress = () => {
  console.log("Loading Progress");
};
loadingManager.onError = () => {
  console.log("Error Loading");
};


// * Texture Loader
// * - Loads an image
// * - Creates a texture from the image
// * - Can be used with a loading manager
const textureLoader = new THREE.TextureLoader(loadingManager);
const worldTexture = textureLoader.load('/texture/color.jpg')

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
const geometry = new THREE.SphereGeometry(0.5, 64, 64);
console.log(geometry);
// * Using a texture with a material

const material = new THREE.MeshBasicMaterial({ map: worldTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 1;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
