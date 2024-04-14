import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * 礼（倒れる）
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function bowDown(props: WingDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.type = "BOW";
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
