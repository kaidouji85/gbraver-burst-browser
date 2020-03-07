// @flow

import {PlayerLightingDozerView} from "./player-lighting-dozer-view";
import type {Resources} from "../../../../resource";
import type {LightningDozerModel} from "../model/lightning-dozer-model";

/**
 * 敵側のライトニングドーザビュー
 */
export class EnemyLightningDozerView extends PlayerLightingDozerView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: LightningDozerModel): void {
    super.engage(model);
    const target = this.getObject3D();
    target.position.x *= -1;
    target.scale.x = -1;
  }


}