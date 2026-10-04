import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import type { LightningDozerCutInModel } from "../model/lightning-dozer-cutin-model";

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
   * @param preRender PreRender情報
   */
  engage(model: LightningDozerCutInModel, preRender: PreRender): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D;
}
