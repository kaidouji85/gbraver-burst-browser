import { BatteryEnchantmentAnimationProps } from "../animation/animation-props";
import { BatteryEnchantmentView } from "../view/battery-enchantment-view";

/** バッテリー増強プロパティ */
export type BatteryEnchantmentProps = BatteryEnchantmentAnimationProps & {
  /** ビュー */
  view: BatteryEnchantmentView;
};
