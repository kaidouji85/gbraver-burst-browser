// @flow

import * as THREE from 'three';

/**
 * メッシュを左右反転する
 * 本関数は引数のメッシュを直接操作するという副作用がある
 *
 * @param mesh メッシュ
 */
export function flip(mesh: THREE.Mesh): void {
  mesh.position.x *= -1;
  mesh.scale.x *= -1;
}