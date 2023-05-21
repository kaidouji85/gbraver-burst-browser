import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { batteryMinusPop as batteryMinusPopAnimate } from "../animation/battery-minus-pop";
import { canBatteryMinus } from "../model/can-battery-minus";
import { BatterySelectorProps } from "../props";
import { batteryChange } from "./battery-change";

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
    batteryMinusPopAnimate(props.model, props.sounds, props.batteryMinusTween),
    batteryChange(props, props.model.battery - 1)
  );
}
