import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * ノックバック
 *
 * @param model モデル
 * @return アニメーション
 */
export function knockBack(props: WingDozerAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.animation.frame = 1;
    model.animation.type = "KNOCK_BACK";
  })
    .chain(
      tween(model.position, (t) =>
        t.to(
          {
            x: "+20",
          },
          100,
        ),
      ),
    )
    .chain(
      tween(model.position, (t) =>
        t.to(
          {
            x: "-20",
          },
          100,
        ),
      ),
    );
}
