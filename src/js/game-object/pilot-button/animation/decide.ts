import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { PilotButtonAnimationProps } from "./animation-props";

/**
 * ボタンクリック
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function decide(
  props: PilotButtonAnimationProps
): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    sounds.pushButton.sound.play();
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1.1,
          },
          100,
        ),
      ),
    )
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1,
          },
          100,
        ),
      ),
    );
}
