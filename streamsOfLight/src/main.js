import * as THREE from 'three';

// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create light streams
const numStreams = 10; // Number of light streams
const streams = [];

for (let i = 0; i < numStreams; i++) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(2 * 3); // 2 vertices with 3 coordinates each
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const stream = new THREE.Line(geometry, material);
  streams.push(stream);
  scene.add(stream);
}

// Animate the streams
function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < numStreams; i++) {
    const stream = streams[i];
    const positions = stream.geometry.attributes.position.array;

    for (let j = 0; j < positions.length; j += 3) {
      positions[j + 1] += Math.random() * 2 - 1; // Move the y-coordinate of the vertex up or down randomly
      if (positions[j + 1] > 50) positions[j + 1] = -50; // Reset the vertex to the bottom if it reaches the top
    }

    stream.geometry.attributes.position.needsUpdate = true; // Update the position attribute in the buffer geometry
  }

  renderer.render(scene, camera);
}

// Resize the renderer when the window size changes
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation
animate();
