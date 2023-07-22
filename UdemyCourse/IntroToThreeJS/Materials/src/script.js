import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();


// * Lights 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 2, 2);
scene.add(ambientLight, pointLight);

// * Texture 
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load('/texture/color.jpg')
const matCapTexture = textureLoader.load('/texture/mat2.png')
const bumpTexture = textureLoader.load('/texture/bump.jpg')
const displacementTexture = textureLoader.load('/texture/displacementMap.jpg')


// * Cube Texture loader
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
  '/texture/env/px.png',
  '/texture/env/nx.png',
  '/texture/env/py.png',
  '/texture/env/ny.png',
  '/texture/env/pz.png',
  '/texture/env/nz.png',
])

scene.background = environmentMapTexture;

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

// * Mesh basic material
// const geometry = new THREE.PlaneBufferGeometry(1, 1, 64, 64);
// const material = new THREE.MeshBasicMaterial({ map: colorTexture});
// material.color = new THREE.Color(0xff0000);
// material.transparent = true;
// material.opacity = 0.4;
// material.visible = false;


// * Mesh depth material 
// * closer to the camera, the lighter it gets
// const geometry = new THREE.TorusGeometry(0.7, 0.2, 64, 128);
// const material = new THREE.MeshDepthMaterial();


// * Mesh normal material
// * shows the normals of the mesh
// const geometry = new THREE.TorusGeometry(0.7, 0.2, 64, 128);
// const material = new THREE.MeshNormalMaterial();

// * Mesh matcap material
// * matcap texture is a texture that has a lot of lighting information
// * it is used to fake lighting
// const geometry = new THREE.TorusGeometry(0.4, 0.2, 64, 128);
// const material = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });


// ! These meshes dont work without lights
// * Mesh lambert material
// * it is a non shiny material
// const geometry = new THREE.TorusGeometry(0.4, 0.2, 64, 128);
// const material = new THREE.MeshLambertMaterial();

// * Mesh phong material
// * Similar to lambert but better for performance and has a lot of properties
// const geometry = new THREE.TorusGeometry(0.4, 0.2, 64, 128);
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 300;
// material.specular = new THREE.Color('green');

// * Mesh toon material
// * it is a non shiny material
// * looks kinda cartoonish 
// const geometry = new THREE.TorusGeometry(0.4, 0.2, 64, 128);
// const material = new THREE.MeshToonMaterial();

// * Mesh standard material
// * it is a shiny material
// * it is a physically based material
// * it is the most realistic material
// * it is the most expensive material
// * it is the most used material 
// * Similar to what we would use in unreal 
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial();
// material.map = colorTexture;
// material.bumpMap = bumpTexture;
// material.displacementMap = displacementTexture;

material.metalness = 0.9;
material.roughness = 0.1;
material.envMap = environmentMapTexture;

material.side = THREE.DoubleSide;
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
