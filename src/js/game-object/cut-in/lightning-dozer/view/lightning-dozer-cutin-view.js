// @flow

import * as THREE from 'three';
import type {LightningDozerCutInModel} from "../model/lightning-dozer-cutin-model";
import type {PreRender} from "../../../../action/game-loop/pre-render";

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
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D;
}