import * as THREE from 'three';
import * as sphere from '/Users/pdavi/Desktop/Op Zvezda/9s minigame/enemyCore.js'
import * as cone from '/Users/pdavi/Desktop/Op Zvezda/9s minigame/cone.js'
import * as plane from '/Users/pdavi/Desktop/Op Zvezda/9s minigame/plane.js'


// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 10;
camera.position.y = 15;
camera.rotation.x = (299 * Math.PI) / 180;
// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Cone
const player = new cone.Cone(scene);

// Create a moving sphere
const enemy = new sphere.MovingSphere(scene, 25);

//create plane
const plano = new plane.Plane(scene, 25);


// Bullets
const bullets = [];
const controls = new cone.Controls();
let shootBullet = false;
let lastBulletTime = Date.now();
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
            shootBullet = true;
            break;
    }
});
document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case ' ':
            shootBullet = false;
            break;
    }
});

// Render
function render() {
    requestAnimationFrame(render);
    // Move the cone based on keyboard input
    if (controls.keyControls.left) player.move('left');
    if (controls.keyControls.right) player.move('right');
    if (controls.keyControls.up) player.move('up');
    if (controls.keyControls.down) player.move('down');
    // Rotate the cone based on keyboard input
    if (controls.keyControlsArrow.left) player.rotate('left');
    if (controls.keyControlsArrow.right) player.rotate('right');
    //sphere
    enemy.moveWithinLimits();
    // Shoot bullets
    if (shootBullet) {
        const currentTime = Date.now();
        if (currentTime - lastBulletTime > 90) { // Shoot a bullet every 200ms
            const bullet = new cone.Bullet(scene, player.mesh.position, player.mesh.rotation);
            bullets.push(bullet);
            lastBulletTime = currentTime;
        }
    }
    // Move bullets
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        bullet.move();
        if (bullet.mesh.position.z < -15) { // Remove bullets that are off-screen
            scene.remove(bullet.mesh);
            bullets.splice(i, 1);
            i--;
        }
    }
    renderer.render(scene, camera);
}
render();