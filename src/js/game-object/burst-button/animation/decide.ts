import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BurstButtonAnimationProps } from "./animation-props";

/**
 * 決定アニメーション
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function decide(props: BurstButtonAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    props.pushButtonSound.sound.play();
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
