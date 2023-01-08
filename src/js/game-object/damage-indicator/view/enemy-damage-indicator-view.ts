import type { Resources } from "../../../resource";
import type { DamageIndicatorModel } from "../model/damage-indicator-model";
import { PlayerDamageIndicatorView } from "./player-damage-indicator-view";

/** 敵のダメージインジケータ */
export class EnemyDamageIndicatorView extends PlayerDamageIndicatorView {
  constructor(resources: Resources) {
    super(resources);
  }

  /** モデルをビューに反映させる */
  engage(model: DamageIndicatorModel): void {
    super.engage(model);
    this.getObject3D().position.x *= -1;
  }
}
