import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * 礼（倒れる）
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function bowDown(props: GranDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "BOW";
      se.play(sounds.motor);
    }),
  ).chain(tween(model.animation, (t) => t.to({ frame: 1 }, 200)));
}
