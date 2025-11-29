import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/**
 * バッテリーボタンのポップ（音なし）
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function popBatteryButtonSilently(
  props: BatterySelectorAnimationProps,
  maxScale = 1.1,
): Animate {
  const { model } = props;
  return tween(model, (t) => t.to({ batteryButtonScale: maxScale }, 100)).chain(
    tween(model, (t) => t.to({ batteryButtonScale: 1 }, 100)),
  );
}

/**
 * バッテリーボタンのポップ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function popBatteryButton(
  props: BatterySelectorAnimationProps,
): Animate {
  const { sounds, se } = props;
  return onStart(() => {
    se.play(sounds.pushButtonSound);
  }).chain(popBatteryButtonSilently(props));
}
