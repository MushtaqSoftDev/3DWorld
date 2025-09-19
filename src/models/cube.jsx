import * as THREE from "three";

export function createProfileCube() {
  // Profile
  const ahmadTexture = new THREE.TextureLoader().load("Mushtaqprofile.png");

  const ahmad = new THREE.Mesh(
    new THREE.BoxGeometry(8, 8, 8),
    new THREE.MeshBasicMaterial({ map: ahmadTexture })
  );

  ahmad.position.set(0, 0, -5);
  ahmad.scale.set(3, 3, 3);
  return ahmad;
}
