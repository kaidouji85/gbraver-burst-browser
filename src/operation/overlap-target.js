// @flow
import * as THREE from "three";

/** ゲーム画面上で重なり判定ができるオブジェクト */
export interface OverlapTarget {
  /** マウス、指がタッチ対象と重なっているか、trueで重なっている */
  isOverlap(raycaster: THREE.Raycaster): boolean
}