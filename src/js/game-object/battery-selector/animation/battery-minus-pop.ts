import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/**
 * マイナスボタン ポップ 無音
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function silentlyBatteryMinusPop(
  props: BatterySelectorAnimationProps,
): Animate {
  const { model } = props;
  return tween(model, (t) =>
    t.to(
      {
        minusButtonScale: 1.1,
      },
      100,
    ),
  ).chain(
    tween(model, (t) =>
      t.to(
        {
          minusButtonScale: 1,
        },
        100,
      ),
    ),
  );
}

/**
 * マイナスボタン ポップ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function batteryMinusPop(props: BatterySelectorAnimationProps): Animate {
  const { sounds, se } = props;
  return onStart(() => {
    se.play(sounds.batteryChangeSound);
  }).chain(silentlyBatteryMinusPop(props));
}
