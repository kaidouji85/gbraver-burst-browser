// @flow

import type {LightningDozerModel} from "../model/lightning-dozer-model";
import * as THREE from 'three';

/**
 * ライトニングドーザビュー
 */
export interface LightningDozerView {
  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: LightningDozerModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}