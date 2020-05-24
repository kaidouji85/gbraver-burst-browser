// @flow

import * as THREE from 'three';

/**
 * ウィングドーザ ビュー
 */
export interface WingDozerView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
