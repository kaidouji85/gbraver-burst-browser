// @flow

import {PlayerBatteryNumberView} from "./player-battery-number-view";
import type {Resources} from "../../../resource";
import type {BatteryNumberModel} from "../model/battery-number-model";

export class EnemyBatteryNumberView extends PlayerBatteryNumberView {
  constructor(resources: Resources) {
    super(resources);
  }

  engage(model: BatteryNumberModel): void {
    super.engage(model);
    this._canvasMesh.mesh.position.x *= -1;
  }
}