// @flow

import {PlayerLightningDozerCutInView} from "./player-lightning-dozer-cutin-view";
import type {Resources} from "../../../../resource";
import type {LightningDozerCutInModel} from "../model/lightning-dozer-cutin-model";

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
  engage(model: LightningDozerCutInModel): void {
    super.engage(model);
    const target = this.getObject3D();
    target.position.x *= -1;
    target.scale.x *= -1;
  }
}