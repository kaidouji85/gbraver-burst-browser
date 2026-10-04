import { all } from "../../../../../animation/object-animation/all";
import { Animate } from "../../../../../animation/object-animation/animate";
import { tween } from "../../../../../animation/object-animation/tween";
import { GaiCutInAnimationProps } from "./animation-props";

/** アニメ時間 */
const duration = 200;

/**
 * カットインを非表示にする
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hidden(props: GaiCutInAnimationProps): Animate {
  const { model } = props;
  return all(
    tween(model, (t) =>
      t.to(
        {
          opacity: 0,
        },
        duration,
      ),
    ),
    tween(model.position, (t) =>
      t.to(
        {
          x: "-25",
        },
        duration,
      ),
    ),
  );
}
