import { Easing } from "@tweenjs/tween.js";

import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { GenesisBraverAnimationProps } from "./animation-props";

/**
 * ダウン
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function down(props: GenesisBraverAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.animation.type = "KNOCK_BACK";
    model.animation.frame = 1;
  })
    .chain(
      tween(model.position, (t) =>
        t
          .to(
            {
              x: "+70",
            },
            500,
          )
          .easing(Easing.Quadratic.Out),
      ),
    )
    .chain(delay(100))
    .chain(
      onStart(() => {
        model.animation.type = "DOWN";
        model.animation.frame = 0;
      }),
    )
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          300,
        ),
      ),
    );
}
