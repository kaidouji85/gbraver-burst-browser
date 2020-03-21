// @flow

import * as THREE from 'three';

/**
 * 衝撃波のビュー
 */
export interface ShockWaveView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}