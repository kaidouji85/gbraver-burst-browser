import { BatteryNumberView } from "../view/battery-number-view";
import { BatteryNumberAnimationProps } from "../animation/animation-props";

/** バッテリー数字 プロパティ */
export type BatteryNumberProps = BatteryNumberAnimationProps & {
  /** ビュー */
  view: BatteryNumberView;
};
