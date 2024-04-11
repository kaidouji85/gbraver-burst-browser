import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { GenesisBraverAnimationProps } from "./animation-props";

/**
 * ノックバック
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function knockBack(props: GenesisBraverAnimationProps): Animate {
  const { model } = props;
  return all(
    onStart(() => {
      model.animation.type = "KNOCK_BACK";
      model.animation.frame = 1;
    }),
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
