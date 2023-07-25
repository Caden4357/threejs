import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

//Scene
const scene = new THREE.Scene();

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

//Meshes
//1-Mesh
const geometry = new THREE.BoxBufferGeometry();
const material = new THREE.MeshBasicMaterial();
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 1;
scene.add(mesh);

//2-Mesh
const geometry2 = new THREE.BoxBufferGeometry();
const material2 = new THREE.MeshBasicMaterial();
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.x = -1;
scene.add(mesh2);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;
scene.add(camera);



//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// * Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // console.log(pointer);
  // * Casting ray
  raycaster.setFromCamera(pointer, camera); 
  // * Intersecting
  const intersects = raycaster.intersectObjects([mesh, mesh2]);
  console.log(intersects);
  // for (const intersect of intersects) {
  //   gsap.to(intersect.object.scale, { x: 2, y: 2, z: 2, duration: 1 });
  // }
});

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
