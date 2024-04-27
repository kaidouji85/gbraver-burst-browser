import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/**
 * マイナスボタン ポップ 無音
 * @param props アニメーションプロパティ
 * @param group Tweenグループ
 * @returns アニメーション
 */
export function silentlyBatteryMinusPop(
  props: BatterySelectorAnimationProps,
  group: TWEEN.Group,
): Animate {
  const { model } = props;
  return tween(
    model,
    (t) =>
      t.to(
        {
          minusButtonScale: 1.1,
        },
        100,
      ),
    group,
  ).chain(
    tween(
      model,
      (t) =>
        t.to(
          {
            minusButtonScale: 1,
          },
          100,
        ),
      group,
    ),
  );
}

/**
 * マイナスボタン ポップ
 * @param props アニメーションプロパティ
 * @param group Tweenグループ
 * @returns アニメーション
 */
export function batteryMinusPop(
  props: BatterySelectorAnimationProps,
  group: TWEEN.Group,
): Animate {
  const { sounds, se } = props;
  return onStart(() => {
    se.play(sounds.batteryChangeSound);
  }).chain(silentlyBatteryMinusPop(props, group));
}
