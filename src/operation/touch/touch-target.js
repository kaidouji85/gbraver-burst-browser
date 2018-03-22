// @flow
import * as THREE from "three";

/** ゲーム画面上でタッチできるオブジェクト */
export interface TouchTarget {
  /** マウス、指がタッチ対象と重なっているか、trueで重なっている */
  isOverlap(raycaster: THREE.Raycaster): boolean
}