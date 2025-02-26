import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * バックステップ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function backStep(props: GranDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return all(
    tween(model.animation, (t) =>
      t
        .onStart(() => {
          model.animation.type = "BACK_STEP";
        })
        .to({ frame: 0 }, 0),
    ).chain(tween(model.animation, (t) => t.to({ frame: 1 }, 150))),
    tween(model.position, (t) =>
      t.to({ x: "+100" }, 150).onStart(() => {
        se.play(sounds.motor);
      }),
    ),
  )
    .chain(delay(300))
    .chain(
      tween(model.animation, (t) =>
        t.to({ frame: 0 }, 300).onStart(() => {
          se.play(sounds.motor);
        }),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "STAND";
      }),
    );
}
