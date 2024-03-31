import * as THREE from 'three';

export class Cone {
    constructor(scene) {
        this.geometry = new THREE.ConeGeometry(0.7, 2, 10);
        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = Math.PI / -2;
        this.mesh.position.z = 5;
        scene.add(this.mesh);
    }
    move(direction) {
        switch (direction) {
            case 'left':
                this.mesh.position.x -= 0.13;
                break;
            case 'right':
                this.mesh.position.x += 0.13;
                break;
            case 'up':
                this.mesh.position.z -= 0.13;
                break;
            case 'down':
                this.mesh.position.z += 0.13;
                break;
        }
    }
    rotate(direction) {
        switch (direction) {
            case 'left':
                this.mesh.rotation.z += 0.06;
                break;
            case 'right':
                this.mesh.rotation.z -= 0.06;
                break;
        }
    }
}
export class Bullet {
    constructor(scene, position, rotation) {
        this.geometry = new THREE.BoxGeometry(0.3, 0.3, 0.5);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.copy(position);
        this.mesh.position.y += 0.5;
        this.mesh.rotation.copy(rotation);
        this.mesh.rotateX(Math.PI / -2);
        scene.add(this.mesh);
        // Store the initial rotation of the bullet
       this.initialRotation = this.mesh.rotation.clone();
    }
    move() {
        const direction = new THREE.Vector3(0, 0, -1); // Initial direction
        // Apply the bullet's rotation to the direction vector
        direction.applyQuaternion(this.mesh.quaternion);
        // Move the bullet in the direction it's facing
        this.mesh.position.add(direction.multiplyScalar(-0.3)); // Adjust the speed as needed
    }
}
export class Controls {
    constructor() {
        this.keyControls = {
            left: false,
            right: false,
            up: false,
            down: false
        };
        this.keyControlsArrow = {
            left: false,
            right: false,
            up: false,
            down: false
        };
        document.addEventListener('keydown', (event) => {
            this.onKeyDown(event);
        });
        document.addEventListener('keyup', (event) => {
            this.onKeyUp(event);
        });
    }
    onKeyDown(event) {
        switch (event.key) {
            case 'a':
                this.keyControls.left = true;
                break;
            case 'd':
                this.keyControls.right = true;
                break;
            case 'w':
                this.keyControls.up = true;
                break;
            case 's':
                this.keyControls.down = true;
                break;
            case 'ArrowLeft':
                this.keyControlsArrow.left = true;
                break;
            case 'ArrowRight':
                this.keyControlsArrow.right = true;
                break;
            case 'ArrowUp':
                this.keyControlsArrow.up = true;
                break;
            case 'ArrowDown':
                this.keyControlsArrow.down = true;
                break;
        }
    }
    onKeyUp(event) {
        switch (event.key) {
            case 'a':
                this.keyControls.left = false;
                break;
            case 'd':
                this.keyControls.right = false;
                break;
            case 'w':
                this.keyControls.up = false;
                break;
            case 's':
                this.keyControls.down = false;
                break;
            case 'ArrowLeft':
                this.keyControlsArrow.left = false;
                break;
            case 'ArrowRight':
                this.keyControlsArrow.right = false;
                break;
            case 'ArrowUp':
                this.keyControlsArrow.up = false;
                break;
            case 'ArrowDown':
                this.keyControlsArrow.down = false;
                break;
        }
    }
}
