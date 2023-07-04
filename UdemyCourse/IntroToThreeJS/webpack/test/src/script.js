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

const camera = new THREE.PerspectiveCamera(75, aspect.width/aspect.height);

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
const body = document.querySelector('body');
body.addEventListener('mouseover', (e) => {
    cursor.x = e.clientX / aspect.width - 0.5;
    cursor.y = -(e.clientY / aspect.height - 0.5);

    // get exact position of the cursor
    


    purpMesh.position.x = cursor.x;
    purpMesh.position.y = cursor.y;
    console.log(cursor);
}
)
const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    // purpMesh.position.x = elapsedTime;
    // purpMesh.position.y = cursor.y;
    // console.log(cursor);

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
animate();
