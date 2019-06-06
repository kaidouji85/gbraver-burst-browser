// @flow

import {PlayerGaugeView} from "./player-gauge-view";
import type {Resources} from "../../../resource";
import type {PreRender} from "../../../action/game-loop/pre-render";

/** 敵のゲージ */
export class EnemyGaugeView extends PlayerGaugeView {
  constructor(resources: Resources) {
    super(resources);
  }

  preRender(action: PreRender): void {
    super.preRender(action);
    this._canvasMesh.mesh.position.x *= -1;
  }
}
