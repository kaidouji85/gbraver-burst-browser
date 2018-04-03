// @flow
import * as THREE from "three";

/** ゲーム画面上で重なり判定ができるオブジェクト */
export interface OverlapTarget {
  /**
   * レイキャストが重なっているか判定する
   *
   * @param raycaster レイキャスト
   * @return 判定結果、trueで重なっている
   */
  isOverlap(raycaster: THREE.Raycaster): boolean
}