// @flow

import {PlayerShockWaveView} from "./player-shock-wave-view";
import type {Resources} from "../../../../resource";
import type {ShockWaveModel} from "../model/shock-wave-model";

/**
 * 敵の衝撃波ビュー
 */
export class EnemyShockWaveView extends PlayerShockWaveView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShockWaveModel): void {
    super.engage(model);

    this.getObject3D().scale.x *= -1;
    this.getObject3D().position.x *= -1;
  }
}