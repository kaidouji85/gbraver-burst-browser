import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { ShinBraverAnimationProps } from "./animation-props";

/**
 * 倒された
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function defeated(props: ShinBraverAnimationProps): Animate {
  const { model } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 1 }, 0).onStart(() => {
      model.animation.type = "KNOCK_BACK";
    }),
  );
}
