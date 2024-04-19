import type { Resources } from "../../../resource";
import type { BatteryEnchantmentModel } from "../model/battery-enchantment-model";
import { PlayerBatteryEnchantmentView } from "./player-battery-enchantment-view";

/**
 * 敵 バッテリー増強 ビュー
 */
export class EnemyBatteryEnchantmentView extends PlayerBatteryEnchantmentView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
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
