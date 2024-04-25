import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { TsubasaCutInAnimationProps } from "./animation-props";

/** アニメ時間 */
const duration = 200;

/**
 * カットインを非表示にする
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hidden(props: TsubasaCutInAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.opacity = 1;
  }).chain(
    all(
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
    ),
  );
}
