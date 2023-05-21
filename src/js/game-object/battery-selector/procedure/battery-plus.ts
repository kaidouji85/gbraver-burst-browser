import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { batteryPlusPop as batteryPlusPopAnimate } from "../animation/battery-plus-pop";
import { canBatteryPlus } from "../model/can-battery-plus";
import { BatterySelectorProps } from "../props";
import { batteryChange } from "./battery-change";

/**
 * バッテリープラス
 * メモリ最大値の場合は空のアニメーションを返す
 * @param props ゲームオブジェクトプロパティ
 * @return アニメーション
 */
export function batteryPlus(props: BatterySelectorProps): Animate {
  if (!canBatteryPlus(props.model)) {
    return empty();
  }

  props.batteryPlusTween.update();
  props.batteryPlusTween.removeAll();
  return all(
    batteryPlusPopAnimate(props.model, props.sounds, props.batteryPlusTween),
    batteryChange(props, props.model.battery + 1)
  );
}
