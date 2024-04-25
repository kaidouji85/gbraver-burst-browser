import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ShinBraverAnimationProps } from "./animation-props";

/**
 * ストレートパンチ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function straightPunch(props: ShinBraverAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.animation.type = "SP_ATTACK";
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        150,
      ),
    ),
    tween(model.position, (t) =>
      t.to(
        {
          x: "-80",
        },
        150,
      ),
    ),
  );
}
