import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { PilotButtonAnimationProps } from "./animation-props";

/**
 * パイロットボタンを非表示にする
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function close(props: PilotButtonAnimationProps): Animate {
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
