// @flow

import * as THREE from "three";

/**
 * メッシュとマウス、指が重なっているかを判定する、trueで重なっている
 *
 * @param raycaster レイキャスト
 * @return 判定結果
 */
export function isMeshOverlap(raycaster: THREE.Raycaster, mesh: THREE.Mesh): boolean {
  const intersects = raycaster.intersectObjects([mesh]);
  return intersects.length > 0;
}