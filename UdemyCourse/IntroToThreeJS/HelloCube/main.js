console.log("Hello from main.js");
console.log(THREE);

// Scene, object, camera, renderer
// Scene: Where you put objects, lights, cameras, etc.
const scene = new THREE.Scene();


// group 
const group = new THREE.Group();

// Object: Anything that has a position in the scene (e.g. cube, light, camera)
// Mesh: Geometry (shape) + Material (how it looks)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'purple' });

const mesh = new THREE.Mesh(geometry, material); // Mesh is a type of object consist of geometry and material

// Add mesh to scene
// scene.add(mesh);
// Position mesh
// mesh.position.x = 2;
mesh.position.y = 3;
// mesh.position.z = 2;


// Scale the mesh
// mesh.scale.set(5, .5, 5); 

//rotation
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.z = Math.PI * 0.25;


// secpod mesh
const secPodGeometry = new THREE.BoxGeometry(1, 1, 1);
const secPodMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
const secPodMesh = new THREE.Mesh(secPodGeometry, secPodMaterial);
secPodMesh.position.x = 4;
secPodMesh.position.y = 3;
// scene.add(secPodMesh);


group.add(mesh, secPodMesh);
group.position.y = 1;
scene.add(group);


// Axes helper
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

// Camera: What the user sees
// Field of view (fov): How much of the scene is visible at any time (in degrees)
// Aspect ratio: Width of the element divided by the height
// Near and far clipping plane: Only render objects between these distances
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width/aspect.height); // PerspectiveCamera is a type of camera that has fov, aspect ratio, near and far clipping plane
// default for near and far is 1 and 2000 

// Position camera
camera.position.z = 6;
camera.position.x = 2;
camera.position.y = 4;

// Renderer: Takes the scene and camera and displays it on the screen
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas }); // WebGLRenderer is a type of renderer that renders 3D objects
renderer.setSize(aspect.width, aspect.height); // Set the size of the renderer
renderer.render(scene, camera); // Render the scene with the camera