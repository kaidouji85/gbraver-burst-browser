import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import {ARMDOZER_SPRITE_ATTACKER_Z} from "../../position";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * タックル
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function tackle(props: GranDozerAnimationProps): Animate {
  const { model } = props;
  return tween(model, (t) =>
    t
      .to(
        {
          animation: { frame: 0 },
          position: { z: ARMDOZER_SPRITE_ATTACKER_Z },
        },
        0,
      )
      .onStart(() => {
        model.animation.type = "TACKLE";
      }),
  )
    .chain(tween(model.position, (t) => t.to({ x: "-500" }, 300)))
    .chain(tween(model.position, (t) => t.to({ x: "+500" }, 300)));
}
