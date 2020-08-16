// @flow

import * as THREE from 'three';

/**
 * パイロット
 */
export interface Pilot {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   */
  getObject3D(): THREE.Object3D;
}