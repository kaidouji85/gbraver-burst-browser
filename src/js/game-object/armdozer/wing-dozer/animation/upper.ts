import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * アッパー
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function upper(props: WingDozerAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.animation.type = "UPPER_ATTACK";
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
  );
}
