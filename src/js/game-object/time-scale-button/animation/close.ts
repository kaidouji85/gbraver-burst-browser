import type { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { TimeScaleAnimationProps } from "./animation-props";

/**
 * ボタンを非表示にする
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function close(props: TimeScaleAnimationProps): Animate {
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
