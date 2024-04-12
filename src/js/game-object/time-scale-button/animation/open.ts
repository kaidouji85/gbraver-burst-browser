import type { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { TimeScaleAnimationProps } from "./animation-props";

/**
 * ボタンを表示する
 * @param props アニメーションプロパティ
 * @param timeScale タイムスケール値
 * @return アニメーション
 */
export function open(props: TimeScaleAnimationProps, timeScale: number): Animate {
  const { model } = props;
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    model.opacity = 0;
    model.timeScale = timeScale;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
          },
          200,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.shouldPushNotifierStop = false;
      }),
    );
}
