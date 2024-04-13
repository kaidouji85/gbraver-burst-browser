import { BatteryEnchantmentSounds } from "../sounds/battery-enchantment-sounds";
import { BatteryEnchantmentView } from "../view/battery-enchantment-view";
import { BatteryEnchantmentModel } from "../model/battery-enchantment-model";

/** バッテリー増強プロパティ */
export type BatteryEnchantmentProps = {
  /** モデル */
  model: BatteryEnchantmentModel;
  /** ビュー */
  view: BatteryEnchantmentView;
  /** 効果音 */
  sounds: BatteryEnchantmentSounds;
};
