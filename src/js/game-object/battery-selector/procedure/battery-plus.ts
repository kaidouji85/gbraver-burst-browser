import { all } from "../../../animation/all";
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
export async function batteryPlus(props: BatterySelectorProps): Promise<void> {
  if (!canBatteryPlus(props.model)) {
    return;
  }

  props.batteryPlusTween.update();
  props.batteryPlusTween.removeAll();
  await all(
    batteryPlusPopAnimate(props.model, props.sounds, props.batteryPlusTween),
    batteryChange(props, props.model.battery + 1)
  ).play();
}
