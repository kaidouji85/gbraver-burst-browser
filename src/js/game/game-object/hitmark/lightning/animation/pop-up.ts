import { all } from "../../../../../animation/object-animation/all";
import { Animate } from "../../../../../animation/object-animation/animate";
import { onStart } from "../../../../../animation/object-animation/on-start";
import { tween } from "../../../../../animation/object-animation/tween";
import { LightningAnimationProps } from "./animation-props";

/**
 * エフェクトを一瞬だけ表示する
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function popUp(props: LightningAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.frame = 0;
    model.opacity = 1;
    se.play(sounds.lightning);
  }).chain(
    all(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          700,
        ),
      ),
      tween(model, (t) =>
        t.to(
          {
            opacity: 0.5,
          },
          600,
        ),
      ).chain(
        tween(model, (t) =>
          t.to(
            {
              opacity: 0,
            },
            100,
          ),
        ),
      ),
    ),
  );
}
