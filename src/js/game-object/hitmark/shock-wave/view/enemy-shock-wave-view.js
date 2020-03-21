// @flow

import {PlayerShockWaveView} from "./player-shock-wave-view";
import type {Resources} from "../../../../resource";

/**
 * 敵の衝撃波ビュー
 */
export class EnemyShockWaveView extends PlayerShockWaveView {
  constructor(resources: Resources) {
    super(resources);

    this.getObject3D().scale.x *= -1;
    this.getObject3D().position.x *= -1;
  }
}