import * as THREE from "three";

const getMeshesFromGroup = (group: THREE.Object3D<THREE.Object3DEventMap>) => {
  const meshes: THREE.Mesh[] = [];

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      meshes.push(child);
    }
  });

  return meshes;
}

export default getMeshesFromGroup;