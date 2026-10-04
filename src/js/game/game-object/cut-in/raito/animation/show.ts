import { all } from "../../../../../animation/object-animation/all";
import { Animate } from "../../../../../animation/object-animation/animate";
import { onStart } from "../../../../../animation/object-animation/on-start";
import { tween } from "../../../../../animation/object-animation/tween";
import { RaitoCutInAnimationProps } from "./animation-props";

/** アニメ時間 */
const duration = 400;

/**
 * カットインを表示する
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function show(props: RaitoCutInAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model, (t) =>
    t.to(
      {
        opacity: 0,
        position: { x: -25 },
      },
      0,
    ),
  )
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
