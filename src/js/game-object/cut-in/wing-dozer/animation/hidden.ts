import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { WingDozerCutInAnimationProps } from "./animation-props";

/**
 * カットインを消す
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function hidden(props: WingDozerCutInAnimationProps): Animate {
  const { model } = props;
  return tween(model, (t) =>
    t.to(
      {
        opacity: 0,
        scale: 1.1,
      },
      300,
    ),
  );
}
