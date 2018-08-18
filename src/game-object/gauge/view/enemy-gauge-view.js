// @flow

import {PlayerGaugeView} from "./player-gauge-view";
import type {Resources} from "../../../resource";
import type {GaugeModel} from "../model/gauge-model";

/** 敵のゲージ */
export class EnemyGaugeView extends PlayerGaugeView {
  constructor(resources: Resources) {
    super(resources);
  }

  engage(model: GaugeModel): void {
    super.engage(model);
    this._canvasMesh.mesh.position.x *= -1;
  }
}