import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_ATTACKER_Z } from "../../../td-position";
import { GranDozerCutInAnimationProps } from "./animation-props";

/**
 * カットインを表示する
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function show(props: GranDozerCutInAnimationProps): Animate {
  const { model } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "BURST_UP";
    }),
  )
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300)))
    .chain(delay(300))
    .chain(
      tween(model, (t) =>
        t
          .onStart(() => {
            model.animation.type = "BURST_DOWN";
          })
          .to(
            {
              animation: { frame: 0 },
              position: { z: ARMDOZER_SPRITE_ATTACKER_Z },
            },
            0,
          ),
      ),
    )
    .chain(tween(model, (t) => t.to({ animation: { frame: 1 } }, 300)));
}
