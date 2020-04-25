// @flow

import {PlayerRecoverBatteryView} from "./player-recover-battery-view";
import type {Resources} from "../../../resource";
import type {RecoverBatteryModel} from "../model/recover-battery-model";

/** 敵の回復バッテリー */
export class EnemyRecoverBatteryView extends PlayerRecoverBatteryView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: RecoverBatteryModel): void {
    super.engage(model);
    this.getObject3D().position.x *= -1;
  }
}