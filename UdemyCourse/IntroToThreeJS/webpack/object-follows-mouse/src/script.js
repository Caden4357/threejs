import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()


const purpCircle = new THREE.SphereGeometry(.1, 12, 12);

const purple = new THREE.MeshBasicMaterial({ color: 'purple' });

const purpMesh = new THREE.Mesh(purpCircle, purple);

scene.add(purpMesh);

const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);

camera.position.z = 1;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.draw')
});

renderer.setSize(aspect.width, aspect.height);

renderer.render(scene, camera);


// get cursor position
const cursor = {
    x: 0,
    y: 0
}

// add event listener to get cursor position
window.addEventListener('mousemove', (e) => {
    // Get the mouse position with normalized coordinates
    cursor.x = (e.clientX / window.innerWidth) * 2 - 1;
    cursor.y = - (e.clientY / window.innerHeight) * 2 + 1;

    // By ChatGPT
    // We first create a THREE.Vector3 where the x and y values are our normalized mouse position, and the z value is roughly the z-position of the sphere (because we want to find a position on the same plane as the sphere).
    // We then use unproject(camera) to transform this vector to the world space.
    // After that, we calculate the direction from the camera to this new vector.
    // We calculate the distance we need to travel in this direction to reach z=0 (the sphere's plane).
    // Finally, we calculate the new position and set the sphere's position to this new position.

    let vector = new THREE.Vector3(cursor.x, cursor.y, 0.5); // 0.5 because the sphere is located at z=0.5
    vector.unproject(camera);
    let dir = vector.sub(camera.position).normalize();
    let distance = - camera.position.z / dir.z;
    let pos = camera.position.clone().add(dir.multiplyScalar(distance));
    purpMesh.position.copy(pos);
}
)
const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    // targetX = cursor.x * .001;
    // purpMesh.position.x = elapsedTime;
    // purpMesh.position.y = cursor.y;
    // console.log(cursor);

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
animate();
