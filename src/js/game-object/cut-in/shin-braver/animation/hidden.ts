import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { ShinBraverCutInAnimationProps } from "./animation-props";

/**
 * カットインを非表示にする
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function hidden(props: ShinBraverCutInAnimationProps): Animate {
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
