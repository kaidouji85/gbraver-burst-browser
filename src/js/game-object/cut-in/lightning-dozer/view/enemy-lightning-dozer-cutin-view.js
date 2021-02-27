// @flow

import {PlayerLightningDozerCutInView} from "./player-lightning-dozer-cutin-view";
import type {Resources} from "../../../../resource";
import type {LightningDozerCutInModel} from "../model/lightning-dozer-cutin-model";
import type {PreRender} from "../../../../game-loop/pre-render";

/**
 * 敵 ライトニングドーザ  カットイン ビュー
 */
export class EnemyLightningDozerCutInView extends PlayerLightningDozerCutInView {
  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender PreRender情報
   */
  engage(model: LightningDozerCutInModel, preRender: PreRender): void {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }
}