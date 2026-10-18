import * as THREE from "three";

import type { LightningModel } from "../model/lightning-model";

/**
 * 電撃ヒットマークのビュー
 */
export interface LightningView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   */
  engage(model: LightningModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
