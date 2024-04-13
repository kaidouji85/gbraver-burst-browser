import { BatteryCorrectView } from "../view/battery-correct-view";
import {BatteryCorrectAnimationProps} from "../animation/animation-props";

/** バッテリー補正 プロパティ */
export type BatteryCorrectProps = BatteryCorrectAnimationProps & {
  /** ビュー */
  view: BatteryCorrectView;
};
