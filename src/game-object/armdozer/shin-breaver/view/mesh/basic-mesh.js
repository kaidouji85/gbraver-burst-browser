// @flow

import * as THREE from "three";
import {SPRITE_RENDER_ORDER} from "../../../../../mesh/render-order";

export const MESH_WIDTH = 320;
export const MESH_HEIGHT = 320;

/** シンブレイバースプライトのメッシュを生成する */
export function createBasicMesh() {
  const geometry = new THREE.PlaneGeometry(MESH_HEIGHT, MESH_WIDTH, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = SPRITE_RENDER_ORDER;
  return mesh;
}