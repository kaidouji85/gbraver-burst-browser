// @flow

import * as THREE from 'three';

/**
 * パイロットアイコン
 */
export interface PilotIcon {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return 取得結果
   */
  getObject3D(): typeof THREE.Object3D;

  /**
   * 透明度を設定する
   *
   * @param opacity 透明度
   */
  setOpacity(opacity: number): void;
}