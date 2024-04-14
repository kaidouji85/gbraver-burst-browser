import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { GenesisBraverAnimationProps } from "./animation-props";

/**
 * 気をつけ
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function upright(props: GenesisBraverAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.type = "UPRIGHT";
    model.animation.frame = 0;
    se.play(sounds.motor);
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        200,
      ),
    ),
  );
}
