// @flow

import {PlayerDamageIndicatorView} from "./player-damage-indicator-view";
import type {Resources} from "../../../resource";
import type {DamageIndicatorModel} from "../model/damage-indicator-model";

/** 敵のダメージインジケータ */
export class EnemyDamageIndicatorView extends PlayerDamageIndicatorView {
  constructor(resources: Resources) {
    super(resources);
  }

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void {
    super.engage(model);
    this._canvasMesh.mesh.position.x *= -1;
  }
}