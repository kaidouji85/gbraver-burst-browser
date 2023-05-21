import {Animate} from "../../../animation/animate";
import {batteryMinusPop as batteryMinusPopAnimate} from "../animation/battery-minus-pop";
import {BatterySelectorProps} from "../props";

/**
 * バッテリーマイナスボタン ポップ
 * @param props ゲームオブジェクトプロパティ
 * @return アニメーション
 */
export function batteryMinusPop(props: BatterySelectorProps): Animate {
  props.batteryMinusTween.update();
  props.batteryMinusTween.removeAll();
  return batteryMinusPopAnimate(props.model, props.sounds, props.batteryMinusTween);
}