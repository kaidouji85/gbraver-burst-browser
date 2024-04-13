import { BatteryNumberAnimationProps } from "../animation/animation-props";
import { BatteryNumberView } from "../view/battery-number-view";

/** バッテリー数字 プロパティ */
export type BatteryNumberProps = BatteryNumberAnimationProps & {
  /** ビュー */
  view: BatteryNumberView;
};
