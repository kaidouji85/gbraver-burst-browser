// @flow

import {PlayerBatteryEnchantmentView} from "./player-battery-enchantment-view";
import type {Resources} from "../../../resource";
import type {BatteryEnchantmentModel} from "../model/battery-enchantment-model";

/**
 * 敵 バッテリー増強 ビュー
 */
export class EnemyBatteryEnchantmentView extends PlayerBatteryEnchantmentView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: BatteryEnchantmentModel): void {
    super.engage(model);

    const target = super.getObject3D();
    target.position.x *= -1;
  }
}