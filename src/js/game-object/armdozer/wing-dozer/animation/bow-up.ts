import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * 礼（起き上がる）
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function bowUp(props: WingDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.type = "BOW";
    model.animation.frame = 1;
    se.play(sounds.motor);
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          200,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "UPRIGHT";
        model.animation.frame = 1;
      }),
    );
}
