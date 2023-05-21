import { all } from "../../../animation/all";
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
export async function batteryMinus(props: BatterySelectorProps): Promise<void> {
  if (!canBatteryMinus(props.model)) {
    return;
  }

  props.batteryMinusTween.update();
  props.batteryMinusTween.removeAll();
  await all(
    batteryMinusPopAnimate(props.model, props.sounds, props.batteryMinusTween),
    batteryChange(props, props.model.battery - 1)
  ).play();
}
