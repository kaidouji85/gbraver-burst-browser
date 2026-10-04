import { BatteryEnhancementAnimationProps } from "../animation/animation-props";
import { BatteryEnhancementView } from "../view/battery-enhancement-view";

/** バッテリー増強プロパティ */
export type BatteryEnhancementProps = BatteryEnhancementAnimationProps & {
  /** ビュー */
  view: BatteryEnhancementView;
};
