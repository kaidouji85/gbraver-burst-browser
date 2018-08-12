// @flow

import * as THREE from 'three';

/**
 * 当たり判定用のメッシュを生成する
 *
 * @param width 幅
 * @param height 高
 * @return メッシュ
 */
export function createOverlapMesh(width: number, height: number): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('rgb(0, 255, 0)'),
    visible: true
  });
  return new THREE.Mesh(geometry, material);
}