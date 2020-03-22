// @flow

import * as THREE from 'three';
import type {ShockWaveModel} from "../model/shock-wave-model";

/**
 * 衝撃波のビュー
 */
export interface ShockWaveView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShockWaveModel): void;

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}