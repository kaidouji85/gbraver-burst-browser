// @flow

import * as THREE from 'three';
import type {BurstIndicatorModel} from "../model/burst-indicator-model";

/** バーストインジケータビュー */
export interface BurstIndicatorView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: BurstIndicatorModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}