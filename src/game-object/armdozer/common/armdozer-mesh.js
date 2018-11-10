// @flow

import * as THREE from 'three';

/** アームドーザメッシュ */
export interface ArmdozerMesh {
  /**
   * アニメーション進捗を変更する
   *
   * @param animation 0〜1で指定するアニメーション進捗度
   */
  animate(animation: number): void;

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;
}