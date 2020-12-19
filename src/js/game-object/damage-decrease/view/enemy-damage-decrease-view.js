// @flow

import {PlayerDamageDecreaseView} from "./player-damage-decrease-view";
import type {Resources} from "../../../resource";
import type {DamageDecreaseModel} from "../model/damage-decrease-model";

/**
 * 敵 ダメージ減少 ビュー
 */
export class EnemyDamageDecreaseView extends PlayerDamageDecreaseView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: DamageDecreaseModel): void {
    super.engage(model);

    const target = super.getObject3D();
    target.position.x *= -1;
  }
}