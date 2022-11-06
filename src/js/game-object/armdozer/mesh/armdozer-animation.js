// @flow

import * as THREE from "three";

/** アームドーザアニメーション */
export interface ArmdozerAnimation {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * アニメーション進捗を変更する
   *
   * @param animation 0〜1で指定するアニメーション進捗度
   */
  animate(animation: number): void;

  /**
   * 透明度を設定する
   * @param value 設定値
   */
  opacity(value: number): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return 取得結果
   */
  getObject3D(): typeof THREE.Object3D;
}
