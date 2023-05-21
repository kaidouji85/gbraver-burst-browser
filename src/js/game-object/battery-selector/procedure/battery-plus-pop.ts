import { Animate } from "../../../animation/animate";
import { batteryPlusPop as batteryPlusPopAnimate } from "../animation/battery-plus-pop";
import { BatterySelectorProps } from "../props";

/**
 * バッテリープラスボタン ポップ
 * @param props ゲームオブジェクトプロパティ
 * @return アニメーション
 */
export function batteryPlusPop(props: BatterySelectorProps): Animate {
  props.batteryPlusTween.update();
  props.batteryPlusTween.removeAll();
  return batteryPlusPopAnimate(
    props.model,
    props.sounds,
    props.batteryPlusTween
  );
}
