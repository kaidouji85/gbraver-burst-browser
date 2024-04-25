import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BurstButtonAnimationProps } from "./animation-props";

/**
 * 決定アニメーション
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function decide(props: BurstButtonAnimationProps): Animate {
  const { model, se } = props;
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    se.play(props.pushButtonSound);
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
