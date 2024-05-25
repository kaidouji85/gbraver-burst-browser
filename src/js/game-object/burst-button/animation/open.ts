import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BurstButtonAnimationProps } from "./animation-props";

/**
 * バーストボタンを表示する
 * @param props アニメーションプロパティ
 * @param canBurst バースト可能かどうか、trueでバースト可能
 * @returns アニメーション
 */
export function open(
  props: BurstButtonAnimationProps,
  canBurst: boolean,
): Animate {
  const { model } = props;
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    model.canActivateBurst = canBurst;
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
        model.shouldPushNotifierStop = false;
      }),
    );
}
