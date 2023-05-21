import {Animate} from "../../../animation/animate";
import {canBatteryMinus} from "../model/can-battery-minus";
import {empty} from "../../../animation/delay";
import {all} from "../../../animation/all";
import {batteryChange} from "./battery-change";
import {BatterySelectorProps} from "../props";
import {batteryMinusPop as batteryMinusPopAnimate} from "../animation/battery-minus-pop";

/**
 * バッテリーマイナス
 * メモリ最小値の場合は空のアニメーションを返す
 * @param props ゲームオブジェクトプロパティ
 * @return アニメーション
 */
export function batteryMinus(props: BatterySelectorProps): Animate {
  if (!canBatteryMinus(props.model)) {
    return empty();
  }

  props.batteryMinusTween.update();
  props.batteryMinusTween.removeAll();
  return all(
    batteryMinusPopAnimate(
      props.model,
      props.sounds,
      props.batteryMinusTween
    ),
    batteryChange(props, props.model.battery - 1)
  );
}