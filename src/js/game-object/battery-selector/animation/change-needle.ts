import { Group } from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/** 最大アニメ時間 */
const MAX_DURATION = 500;

/**
 * メーター針を変化させる
 *
 * @param props アニメーションプロパティ
 * @param group Tweenグループ
 * @param needle メーター針の値
 * @returns アニメーション
 */
export function changeNeedle(
  props: BatterySelectorAnimationProps,
  group: Group,
  needle: number,
): Animate {
  const { model } = props;
  const duration = Math.abs(model.needle - needle) * MAX_DURATION;
  return tween(
    model,
    (t) =>
      t.to(
        {
          needle: needle,
        },
        duration,
      ),
    group,
  );
}
