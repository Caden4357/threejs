// Scene, MEsh, Camera, Renderer

// Scene 
const scene = new THREE.Scene();

// Mesh made up of geometry and material
// Geometry: Shape of the object
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Material: How the object looks like
const material = new THREE.MeshBasicMaterial({ color: 'purple' });
// create mesh
const mesh = new THREE.Mesh(geometry, material);

// Add mesh to scene
scene.add(mesh);

// Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width/aspect.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.draw')
});
renderer.setSize(aspect.width, aspect.height);

// Render
renderer.render(scene, camera);


// Clock class
const clock = new THREE.Clock();

// Animation
const animate = () => {
    // get elapsed time
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime);
    mesh.rotation.y = elapsedTime;
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
animate();
