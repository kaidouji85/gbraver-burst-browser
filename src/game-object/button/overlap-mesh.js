// @flow

import * as THREE from "three";

export function createOverlapMesh(width: number, height: number): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    visible: false
  });
  return new THREE.Mesh(geometry, material);
}