// @flow

import * as THREE from "three";
import {SPRITE_RENDER_ORDER} from "../../../../../mesh/render-order";
import {MESH_HEIGHT, MESH_WIDTH} from "../player-shin-braver-view";

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