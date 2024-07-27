import { Group } from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/**
 * プラスボタン ポップ 無音
 * @param props アニメーションプロパティ
 * @param group Tweenグループ
 * @returns アニメーション
 */
export function silentlyBatteryPlusPop(
  props: BatterySelectorAnimationProps,
  group: Group,
): Animate {
  const { model } = props;
  return tween(
    model,
    (t) =>
      t.to(
        {
          plusButtonScale: 1.1,
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
            plusButtonScale: 1,
          },
          100,
        ),
      group,
    ),
  );
}

/**
 * プラスボタン ポップ
 * @param props アニメーションプロパティ
 * @param group Tweenグループ
 * @returns アニメーション
 */
export function batteryPlusPop(
  props: BatterySelectorAnimationProps,
  group: Group,
): Animate {
  const { sounds, se } = props;
  return onStart(() => {
    se.play(sounds.batteryChangeSound);
  }).chain(silentlyBatteryPlusPop(props, group));
}
