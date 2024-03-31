import * as THREE from 'three';

export class Plane {
    constructor(scene, size) {
        this.size = size;
        this.createPlane(scene);
        this.createWalls(scene);
    }

    createPlane(scene) {
        const planeGeometry = new THREE.BoxGeometry(this.size, 0.1, this.size);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.position.y = -1.55;
        scene.add(this.plane);
    }

    createWalls(scene) {
        const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });

        // Left wall
        const leftWallGeometry = new THREE.BoxGeometry(0.1, 2, this.size);
        this.leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
        this.leftWall.position.x = -this.size / 2;
        this.leftWall.position.y = -0.5;
        scene.add(this.leftWall);

        // Right wall
        const rightWallGeometry = new THREE.BoxGeometry(0.1, 2, this.size);
        this.rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
        this.rightWall.position.x = this.size / 2;
        this.rightWall.position.y = -0.5;
        scene.add(this.rightWall);

        // Front wall
        const frontWallGeometry = new THREE.BoxGeometry(this.size, 2, 0.1);
        this.frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
        this.frontWall.position.z = -this.size / 2;
        this.frontWall.position.y = -0.5;
        scene.add(this.frontWall);

        // Back wall
        const backWallGeometry = new THREE.BoxGeometry(this.size, 2, 0.1);
        this.backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        this.backWall.position.z = this.size / 2;
        this.backWall.position.y = -0.5;
        scene.add(this.backWall);
    }
}
