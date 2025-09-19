import * as THREE from "three";

export function createTorus() {
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6347,
    wireframe: true,
  });
  return new THREE.Mesh(geometry, material);
}
