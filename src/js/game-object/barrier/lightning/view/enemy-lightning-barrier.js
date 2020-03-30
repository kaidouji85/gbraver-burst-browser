// @flow

import {PlayerLightningBarrierView} from "./player-lightning-barrier-view";
import type {Resources} from "../../../../resource";
import type {LightningBarrierModel} from "../model/lightning-barrier-model";

/**
 * 敵側 電撃バリアビュー
 */
export class EnemyLightningBarrier extends PlayerLightningBarrierView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   */
  engage(model: LightningBarrierModel): void {
    super.engage(model);

    const target = super.getObject3D();
    target.scale.x *= -1;
    target.position.x *= -1;
  }
}