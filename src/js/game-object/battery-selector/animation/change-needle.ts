import * as TWEEN from "@tweenjs/tween.js";

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
 * @return アニメーション
 */
export function changeNeedle(
  props: BatterySelectorAnimationProps,
  group: TWEEN.Group,
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
