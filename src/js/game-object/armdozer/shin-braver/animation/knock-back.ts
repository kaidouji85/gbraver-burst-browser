import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ShinBraverAnimationProps } from "./animation-props";

/**
 * ノックバック
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function knockBack(props: ShinBraverAnimationProps): Animate {
  const { model } = props;
  const motion = onStart(() => {
    model.animation.frame = 1;
    model.animation.type = "KNOCK_BACK";
  });
  const position = tween(model.position, (t) =>
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
  );
  return empty().chain(all(motion, position));
}
