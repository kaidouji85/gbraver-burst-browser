// @flow

import * as THREE from 'three';
import type {LightningDozerCutInModel} from "../model/lightning-dozer-cutin-model";

/**
 * ライトニングドーザ カットイン
 */
export interface LightningDozerCutInView {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: LightningDozerCutInModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}