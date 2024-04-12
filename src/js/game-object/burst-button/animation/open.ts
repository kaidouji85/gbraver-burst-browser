import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BurstButtonAnimationProps } from "./animation-props";

/**
 * バーストボタンを表示する
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function open(
  props: BurstButtonAnimationProps,
  canBurst: boolean,
): Animate {
  const { model } = props;
  return onStart(() => {
    model.isPushNotifierDisabled = true;
    model.canBurst = canBurst;
    model.opacity = 0;
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
        model.isPushNotifierDisabled = false;
      }),
    );
}
