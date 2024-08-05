import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { ShinBraverAnimationProps } from "./animation-props";

/**
 * ストレートパンチ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function straightPunch(props: ShinBraverAnimationProps): Animate {
  const { model } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "SP_ATTACK";
    }),
  ).chain(
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
