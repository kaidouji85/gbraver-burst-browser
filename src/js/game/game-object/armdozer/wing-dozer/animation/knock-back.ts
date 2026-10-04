import { Animate } from "../../../../../animation/object-animation/animate";
import { tween } from "../../../../../animation/object-animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * ノックバック
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function knockBack(props: WingDozerAnimationProps): Animate {
  const { model } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 1 }, 0).onStart(() => {
      model.animation.type = "KNOCK_BACK";
    }),
  )
    .chain(tween(model.position, (t) => t.to({ x: "+20" }, 100)))
    .chain(tween(model.position, (t) => t.to({ x: "-20" }, 100)));
}
