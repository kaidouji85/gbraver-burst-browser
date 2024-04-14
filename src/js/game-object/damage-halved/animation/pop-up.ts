import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { DamageHalvedAnimationProps } from "./animation-props";

/**
 * ポップアップ
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function popUp(props: DamageHalvedAnimationProps): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    model.opacity = 0;
    model.scale = 1.2;
    sounds.benefitEffect.sound.play();
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
            scale: 1,
          },
          400,
        ),
      ),
    )
    .chain(delay(600))
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 0,
            scale: 1.1,
          },
          200,
        ),
      ),
    );
}
