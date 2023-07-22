import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

//Scene
const scene = new THREE.Scene();

//Debugging
const gui = new dat.GUI();

// * Color
const materialColor = {
  topColor: 0xff0000,
  groundColor: 0x0000ff,
};
// * Lights 
//AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, .03);
// scene.add(ambientLight);

// * DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, .8);
directionalLight.position.set(1, 1, 1);
// scene.add(directionalLight);

// * HemisphereLight
const hemisphereLight = new THREE.HemisphereLight('white','black', .9);
// scene.add(hemisphereLight);
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, .2);
// scene.add(hemisphereLightHelper);

// * PointLight
const pointLight = new THREE.PointLight('red', 0.8, 3);
// scene.add(pointLight);

// * RectAreaLight
const rectAreaLight = new THREE.RectAreaLight('#5D3FD3', 3,2,2);
// rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.position.z = .5;
// rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

// * Spot Light
// const spotLight = new THREE.SpotLight('white', 1, 8, Math.PI * .25, .01, 1);
// gui.add(spotLight.position, "z").min(-3).max(3).step(0.01).name("Z Spot");
// gui.add(spotLight, 'angle').min(0).max(3).step(0.01).name('Spot Angle');
// gui.add(spotLight, 'penumbra').min(0).max(1).step(0.01).name('Spot Penumbra');
// spotLight.position.z = 2;
// scene.add(spotLight);
// * SpotLightHelper
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// * gui Widgets
// gui.add(hemisphereLight, "intensity").min(0).max(1).step(0.01);
// gui.add(directionalLight, "intensity").min(0).max(1).step(0.01);
// gui.add(directionalLight.position, "x").min(-5).max(5).step(0.01);
// gui.add(directionalLight.position, "y").min(-5).max(5).step(0.01);
// gui.add(directionalLight.position, "z").min(-5).max(5).step(0.01);
// ? widget for sky color and ground color on hemisphere light
// gui.addColor(materialColor, "topColor").onChange(() => {
//   hemisphereLight.color.set(materialColor.topColor);
// });

// gui.addColor(materialColor, "groundColor").onChange(() => {
//   hemisphereLight.groundColor.set(materialColor.groundColor);
// });
// gui.add(pointLight, "intensity").min(0).max(1).step(0.01);
// gui.add(pointLight.position, "x").min(-5).max(5).step(0.01);
// gui.add(pointLight.position, "y").min(-5).max(5).step(0.01);
// gui.add(pointLight.position, "z").min(-5).max(5).step(0.01);

// gui.add(rectAreaLight, "width").min(0).max(7).step(0.01).name("width");
// gui.add(rectAreaLight, "height").min(0).max(7).step(0.01).name("height");


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
const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 100;
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

  // zoom camera in slowly 
  //Renderer
  renderer.render(scene, camera);
  
  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
  if(camera.position.z > 2){
    camera.position.z -= 0.1 * elapsedTime;
  }
};
animate();

// while(camera.position.z > 5){
//   camera.position.z -= 0.01;
// }