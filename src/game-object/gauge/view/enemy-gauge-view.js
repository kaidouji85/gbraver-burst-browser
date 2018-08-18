// @flow

import {PlayerGaugeView} from "./player-gauge-view";
import type {Resources} from "../../../resource";

/** 敵のゲージ */
export class EnemyGaugeView extends PlayerGaugeView {
  constructor(resources: Resources) {
    super(resources);
  }

  /** 座標を設定する */
  _setPos(): void {
    this._canvasMesh.mesh.position.x = -96;
    this._canvasMesh.mesh.position.y = 0;
  }
}