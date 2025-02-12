import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * アッパー
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function upper(props: WingDozerAnimationProps): Animate {
  const { model } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "UPPER_ATTACK";
    }),
  ).chain(tween(model.animation, (t) => t.to({ frame: 1 }, 150)));
}
