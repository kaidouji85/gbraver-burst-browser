// @flow

import * as THREE from "three";

/** シンブレイバーメッシュ共通のマテリアル */
export function neoLandozerMaterial(texture: THREE.Texture): THREE.Material {
  return new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    map: texture
  });
}