import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/** 最大アニメ時間 */
const MAX_DURATION = 500;

/**
 * メーター針を変化させる
 *
 * @param props アニメーションプロパティ
 * @param needle メーター針の値
 * @param timeScale 時間倍率
 * @returns アニメーション
 */
export function changeNeedle(
  props: BatterySelectorAnimationProps,
  needle: number,
  timeScale: number = 1,
): Animate {
  const { model } = props;
  const duration = Math.abs(model.needle - needle) * MAX_DURATION * timeScale;
  return tween(model, (t) => t.to({ needle: needle }, duration));
}
