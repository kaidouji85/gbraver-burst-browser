// @flow

import {PlayerLightningDozerCutInView} from "./player-lightning-dozer-cutin-view";
import type {Resources} from "../../../../resource";
import type {LightningDozeCutInModel} from "../model/lightning-doze-cutin-model";

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
   */
  engage(model: LightningDozeCutInModel): void {
    super.engage(model);
    const target = this.getObject3D();
    target.position.x *= -1;
    target.scale.x *= -1;
  }
}