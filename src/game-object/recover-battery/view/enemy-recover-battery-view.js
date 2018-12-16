// @flow

import {PlayerRecoverBatteryView} from "./player-recover-battery-view";
import type {Resources} from "../../../resource";
import type {RecoverBatteryModel} from "../model/recover-battery-model";

export class EnemyRecoverBatteryView extends PlayerRecoverBatteryView {
  constructor(resources: Resources) {
    super(resources);
  }

  engage(model: RecoverBatteryModel): void {
    super.engage(model);
    this._canvasMesh.mesh.position.x *= -1;
  }
}