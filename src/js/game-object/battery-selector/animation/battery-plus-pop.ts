import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/**
 * プラスボタン ポップ 無音
 * @param props アニメーションプロパティ
 * @param group Tweenグループ
 * @return アニメーション
 */
export function silentlyBatteryPlusPop(
  props: BatterySelectorAnimationProps,
  group: TWEEN.Group,
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
 * @return アニメーション
 */
export function batteryPlusPop(
  props: BatterySelectorAnimationProps,
  group: TWEEN.Group,
): Animate {
  const { sounds } = props;
  return onStart(() => {
    sounds.batteryChangeSound.sound.play();
  }).chain(silentlyBatteryPlusPop(props, group));
}
