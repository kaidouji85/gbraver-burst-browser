import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { RaitoCutInAnimationProps } from "./animation-props";

/** アニメ時間 */
const duration = 400;

/**
 * カットインを表示する
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function show(props: RaitoCutInAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.opacity = 0;
    model.position.x = -25;
  })
    .chain(
      all(
        tween(model, (t) =>
          t.to(
            {
              opacity: 1,
            },
            duration,
          ),
        ),
        tween(model.position, (t) =>
          t.to(
            {
              x: 0,
            },
            duration,
          ),
        ),
      ),
    )
    .chain(
      onStart(() => {
        se.play(sounds.benefitEffect);
      }),
    );
}
