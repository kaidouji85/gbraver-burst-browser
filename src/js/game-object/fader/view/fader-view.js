// @flow

import * as THREE from 'three';

export const MESH_WIDTH = 100;
export const MESH_HEIGHT = 100;

export class FaderView {
  _mesh: THREE.Mesh;

  constructor() {
    const geometry = new THREE.PlaneGeometry(MESH_WIDTH, MESH_HEIGHT);
    const material = new THREE.MeshBasicMaterial({
      color: 'rgb(0, 255, 0)'
    });
    this._mesh = new THREE.Mesh(geometry, material);
  }
  
  getObject3D(): THREE.Object3D {
    return this._mesh;
  }
}