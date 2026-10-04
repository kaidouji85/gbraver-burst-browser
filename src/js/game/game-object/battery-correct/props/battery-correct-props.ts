import { BatteryCorrectAnimationProps } from "../animation/animation-props";
import { BatteryCorrectView } from "../view/battery-correct-view";

/** バッテリー補正 プロパティ */
export type BatteryCorrectProps = BatteryCorrectAnimationProps & {
  /** ビュー */
  view: BatteryCorrectView;
};
