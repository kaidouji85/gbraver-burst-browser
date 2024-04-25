import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { LightningDozerCutInAnimationProps } from "./animation-props";

/**
 * カットインを表示する
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function show(props: LightningDozerCutInAnimationProps): Animate {
  const { model } = props;
  return all(
    onStart(() => {
      model.animation.type = "CUT_IN_UP";
      model.animation.frame = 0;
    })
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
        onStart(() => {
          model.animation.type = "CUT_IN_DOWN";
          model.animation.frame = 0;
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
      ),
    onStart(() => {
      model.opacity = 0;
    }).chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
          },
          500,
        ),
      ),
    ),
    onStart(() => {
      model.scale = 0.9;
    }).chain(
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
