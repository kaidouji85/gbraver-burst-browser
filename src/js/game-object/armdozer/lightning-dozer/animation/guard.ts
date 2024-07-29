import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * ガード
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function guard(props: LightningDozerAnimationProps): Animate {
  const { model } = props;
  return all(
    tween(model.animation, (t) =>
      t.to({ frame: 1 }, 0).onStart(() => {
        model.animation.type = "GUARD";
      }),
    ),
    tween(model.position, (t) =>
      t.to(
        {
          x: "+20",
        },
        100,
      ),
    ).chain(
      tween(model.position, (t) =>
        t.to(
          {
            x: "-20",
          },
          100,
        ),
      ),
    ),
  );
}
