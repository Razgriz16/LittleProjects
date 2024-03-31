import * as THREE from 'three';

export class MovingSphere {
    constructor(scene, planeSize) {
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ color: 0x808080 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.planeSize = planeSize;
        //this.randomizePosition();
        scene.add(this.mesh);
    }
    /*
    randomizePosition() {
        const halfPlaneSize = this.planeSize / 2;
        this.mesh.position.x = Math.random() * this.planeSize - halfPlaneSize;
        this.mesh.position.z = Math.random() * this.planeSize - halfPlaneSize;
        this.mesh.position.y = 0.5; // Adjust as needed to avoid overlapping with the plane
    }
    */
    moveRandomly() {
        const halfPlaneSize = this.planeSize / 2;
        const speed = 0.1; // Adjust the speed of movement as needed
        const direction = new THREE.Vector3(Math.random(), 0, Math.random());
        direction.normalize().multiplyScalar(-speed);
        this.mesh.position.add(direction);
        /*
        // Check if the sphere is out of bounds, then reset its position
        if (this.mesh.position.x < -halfPlaneSize || this.mesh.position.x > halfPlaneSize ||
            this.mesh.position.z < -halfPlaneSize || this.mesh.position.z > halfPlaneSize) {
            this.randomizePosition();
        }
        */
    }
}
