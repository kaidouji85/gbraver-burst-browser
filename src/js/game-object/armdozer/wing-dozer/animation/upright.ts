import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * 気をつけ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function upright(props: WingDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "UPRIGHT";
      se.play(sounds.motor);
    }),
  ).chain(tween(model.animation, (t) => t.to({ frame: 1 }, 200)));
}
