import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * 倒される
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function defeated(props: WingDozerAnimationProps): Animate {
  const { model } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 1 }, 0).onStart(() => {
      model.animation.type = "KNOCK_BACK";
    }),
  );
}
