import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * 避ける
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function backStep(props: GranDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.position, (t) =>
    t.to({ x: "+100" }, 150).onStart(() => {
      se.play(sounds.motor);
    }),
  );
}
