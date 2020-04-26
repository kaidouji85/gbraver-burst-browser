// @flow

import * as THREE from 'three';
import type {LightningDozeCutInModel} from "../model/lightning-doze-cutin-model";

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
  engage(model: LightningDozeCutInModel): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}