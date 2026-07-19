import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * ダウン
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function down(props: GranDozerAnimationProps): Animate {
  const { model } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "DOWN";
    }),
  ).chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300)));
}
