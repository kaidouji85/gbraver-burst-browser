import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/**
 * プラスボタン ポップ 無音
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function silentlyBatteryPlusPop(
  props: BatterySelectorAnimationProps,
): Animate {
  const { model } = props;
  return tween(model, (t) => t.to({ plusButtonScale: 1.1 }, 100)).chain(
    tween(model, (t) => t.to({ plusButtonScale: 1 }, 100)),
  );
}

/**
 * プラスボタン ポップ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function batteryPlusPop(props: BatterySelectorAnimationProps): Animate {
  const { sounds, se } = props;
  return onStart(() => {
    se.play(sounds.batteryChangeSound);
  }).chain(silentlyBatteryPlusPop(props));
}
