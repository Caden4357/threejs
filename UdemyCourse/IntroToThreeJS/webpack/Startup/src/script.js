import './style.css'
import * as THREE from 'three'

// gsap library for animation easier
import gsap from 'gsap';
// Scene, MEsh, Camera, Renderer

// Scene 
const scene = new THREE.Scene();

// Mesh made up of geometry and material
// Geometry: Shape of the object
const purpCircle  = new THREE.SphereGeometry(.5, 24, 32);
const pinkCircle = new THREE.SphereGeometry(.5, 24, 32);

// Material: How the object looks like
const purple = new THREE.MeshBasicMaterial({ color: 'purple' });
const pink = new THREE.MeshBasicMaterial({ color: 'pink' });

// create mesh
const purpMesh = new THREE.Mesh(purpCircle, purple);
const pinkMesh = new THREE.Mesh(pinkCircle, pink);


// Add mesh to scene
scene.add(purpMesh, pinkMesh);

// must be done after mesh is created 
// gsap.to(purpMesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(purpMesh.position, { duration: 2, delay: 2, x:-1 });
// Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width/aspect.height);
camera.position.z = 4;
// camera.position.y = 1;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.draw')
});
renderer.setSize(aspect.width, aspect.height);

// Render
renderer.render(scene, camera);


// mesh.position.x = 0.7;
// Clock class
const clock = new THREE.Clock();

// Animation
const animate = () => {
    // get elapsed time
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime);
    // using elapsed time to move the mesh
    // Linear function
    // mesh.position.x = elapsedTime;
    // mesh.position.y = elapsedTime;
    // mesh.position.z = elapsedTime;
    
    // ! Testing linear function
    // sin and cos (cosign) function
    purpMesh.position.x = Math.sin(elapsedTime * 2);
    purpMesh.position.y = Math.cos(elapsedTime * 2);

    // tan function
    // pinkMesh.position.x = Math.tan(elapsedTime) * 2;
    // pinkMesh.position.y = Math.tan(elapsedTime) * 2;


    // mesh.rotation.y = elapsedTime * Math.PI;
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
animate();
