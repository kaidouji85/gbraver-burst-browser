import { SEPlayer } from "../../../se/se-player";
import { BatteryEnchantmentModel } from "../model/battery-enchantment-model";
import { BatteryEnchantmentSounds } from "../sounds/battery-enchantment-sounds";

/** バッテリー増強 アニメーションプロパティ */
export type BatteryEnchantmentAnimationProps = {
  /** モデル */
  model: BatteryEnchantmentModel;
  /** 効果音 */
  sounds: BatteryEnchantmentSounds;
  /** 効果音再生オブジェクト */
  se: SEPlayer;
};
