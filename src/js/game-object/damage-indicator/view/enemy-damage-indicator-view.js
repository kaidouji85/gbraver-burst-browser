// @flow

import {GROUP_PADDING, PlayerDamageIndicatorView} from "./player-damage-indicator-view";
import type {Resources} from "../../../resource";
import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import {ARMDOZER_EFFECT_STANDARD_X} from "../../armdozer/position";

/** 敵のダメージインジケータ */
export class EnemyDamageIndicatorView extends PlayerDamageIndicatorView {
  constructor(resources: Resources) {
    super(resources);
  }

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void {
    super.engage(model);
    this.getObject3D().position.x = -ARMDOZER_EFFECT_STANDARD_X + GROUP_PADDING;
  }
}