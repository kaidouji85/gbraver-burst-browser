// @flow

import * as THREE from "three";

/**
 * メッシュとマウスポイントが重なっているかを判定する、trueで重なっている
 *
 * @param raycaster マウスポインタのレイキャスト
 * @return 判定結果
 */
export function isMouseOverlap(raycaster: THREE.Raycaster, mesh: THREE.Mesh): boolean {
  const intersects = raycaster.intersectObjects([mesh]);
  return intersects.length > 0;
}