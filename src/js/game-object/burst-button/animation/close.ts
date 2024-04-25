import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BurstButtonAnimationProps } from "./animation-props";

/**
 * バーストボタンを非表示にする
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function close(props: BurstButtonAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    model.opacity = 1;
  }).chain(
    tween(model, (t) =>
      t.to(
        {
          opacity: 0,
        },
        200,
      ),
    ),
  );
}
