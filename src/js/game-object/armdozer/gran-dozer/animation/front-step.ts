import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * フロントステップ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function frontStep(props: GranDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.position, (t) =>
    t.to({ x: "-100" }, 300).onStart(() => {
      se.play(sounds.motor);
    }),
  );
}
