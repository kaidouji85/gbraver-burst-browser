// @flow

import * as THREE from "three";
import type {OverlapTarget} from "../../../../screen-touch/raycaster/overlap-target";
import {isMeshOverlap} from "../../../../screen-touch/raycaster/overlap";

/**
 * 目盛りの当たり判定
 * 本クラスは当たり判定用なので、画面上に表示されることはない
 */
export class Division implements OverlapTarget {
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

  /**
   * マウス、指がタッチ対象と重なっているか、trueで重なっている
   *
   * @param raycaster 指、マウスのレイキャスト
   * @return 判定結果
   */
  isOverlap(raycaster: THREE.Raycaster): boolean {
    return isMeshOverlap(raycaster, this.mesh);
  }
};