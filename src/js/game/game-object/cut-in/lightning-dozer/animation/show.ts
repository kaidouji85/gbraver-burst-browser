import { all } from "../../../../../animation/object-animation/all";
import { Animate } from "../../../../../animation/object-animation/animate";
import { delay } from "../../../../../animation/object-animation/delay";
import { tween } from "../../../../../animation/object-animation/tween";
import { LightningDozerCutInAnimationProps } from "./animation-props";

/**
 * カットインを表示する
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function show(props: LightningDozerCutInAnimationProps): Animate {
  const { model } = props;
  return all(
    tween(model.animation, (t) =>
      t.to({ frame: 0 }, 0).onStart(() => {
        model.animation.type = "CUT_IN_UP";
      }),
    )
      .chain(
        tween(model.animation, (t) =>
          t.to(
            {
              frame: 1,
            },
            200,
          ),
        ),
      )
      .chain(delay(600))
      .chain(
        tween(model.animation, (t) =>
          t.to({ frame: 0 }, 0).onStart(() => {
            model.animation.type = "CUT_IN_DOWN";
          }),
        ),
      )
      .chain(
        tween(model.animation, (t) =>
          t.to(
            {
              frame: 1,
            },
            200,
          ),
        ),
      ),
    tween(model, (t) =>
      t.to(
        {
          opacity: 1,
        },
        500,
      ),
    ),
    tween(model, (t) => t.to({ scale: 0.9 }, 0)).chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1,
          },
          300,
        ),
      ),
    ),
  );
}
