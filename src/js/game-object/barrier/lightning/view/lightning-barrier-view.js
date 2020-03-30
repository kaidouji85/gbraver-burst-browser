// @flow

import * as THREE from 'three';
import type {LightningBarrierModel} from "../model/lightning-barrier-model";

/**
 * 電撃バリアビュー
 */
export interface LightningBarrierView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   */
  engage(model: LightningBarrierModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}