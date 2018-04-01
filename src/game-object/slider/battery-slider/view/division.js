// @flow

import * as THREE from "three";

/**
 * 目盛りの当たり判定
 * 本クラスは当たり判定用なので、画面上に表示されることはない
 */
export class Division  {
  /** 当たり判定用のメッシュ */
  mesh: THREE.Mesh;
  /** 当たり判定オブジェクトにタッチした際のスライダー値 */
  value: number;

  constructor(width: number, height: number, value: number, color: number) {
    const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
    const material = new THREE.MeshBasicMaterial({color});
    this.mesh = new THREE.Mesh(geometry, material);
    this.value = value;
  }
};