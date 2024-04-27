import { RecoverBatteryAnimationProps } from "../animation/animation-props";
import { RecoverBatteryView } from "../view/recover-battery-view";

/** バッテリー回復 プロパティ */
export type RecoverBatteryProps = RecoverBatteryAnimationProps & {
  /** ビュー */
  view: RecoverBatteryView;
};
