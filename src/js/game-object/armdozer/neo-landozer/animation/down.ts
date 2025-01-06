import { Easing } from "@tweenjs/tween.js";

import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { tween } from "../../../../animation/tween";
import { NeoLandozerAnimationProps } from "./animation-props";

/**
 * ダウン
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function down(props: NeoLandozerAnimationProps): Animate {
  const { model } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 1 }, 0).onStart(() => {
      model.animation.type = "KNOCK_BACK";
    }),
  )
    .chain(
      tween(model.position, (t) =>
        t.to({ x: "+70" }, 500).easing(Easing.Quadratic.Out),
      ),
    )
    .chain(delay(100))
    .chain(
      tween(model.animation, (t) =>
        t.to({ frame: 0 }, 0).onStart(() => {
          model.animation.type = "DOWN";
        }),
      ),
    )
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300)));
}
