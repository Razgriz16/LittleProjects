import * as THREE from 'three';
//0x00ff00

export class MovingSphere {
    constructor(scene, planeSize) {
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ color: 0x808080 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.planeSize = planeSize;
        this.direction = 1; // Initial direction: 1 for right, -1 for left
        this.speed = 0.08; // Adjust the speed of movement as needed
        this.mesh.position.x = -planeSize / 3; // Start at the left edge
        this.mesh.position.z = -5; // Start at the center
        this.mesh.position.y = 0.5; // Adjust as needed to avoid overlapping with the plane
        scene.add(this.mesh);
    }

    moveWithinLimits() {
        const halfPlaneSize = this.planeSize / 3;
        this.mesh.position.x += this.direction * this.speed;

        // Check if the sphere reaches the right or left limit
        if (this.mesh.position.x >= halfPlaneSize || this.mesh.position.x <= -halfPlaneSize) {
            this.direction *= -1; // Change direction
        }
    }
}

/*
//scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 10;
camera.position.y = 15;
camera.rotation.x = (299 * Math.PI) / 180;
// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a moving sphere
const movingSphere = new MovingSphere(scene, 25); // Assuming the plane has a size of 25

// Update the position of the moving sphere in the render loop
function render() {
    requestAnimationFrame(render);
    // Move the moving sphere within limits
    movingSphere.moveWithinLimits();

    // Render scene
    renderer.render(scene, camera);
}

render();
*/