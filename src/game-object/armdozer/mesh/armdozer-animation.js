// @flow

import * as THREE from 'three';

/** アームドーザアニメーション */
export interface ArmdozerAnimation {
  /** デストラクタ */
  destructor(): void;

  /**
   * アニメーション進捗を変更する
   *
   * @param animation 0〜1で指定するアニメーション進捗度
   */
  animate(animation: number): void;

  /** 表示、非表示を設定する */
  visible(isVisible: boolean): void;

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;
}