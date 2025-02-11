import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_ATTACKER_Z } from "../../position";
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
      .onStart(() => {
        model.animation.type = "TACKLE_ATTACK";
      })
      .to(
        {
          animation: { frame: 0 },
          position: { z: ARMDOZER_SPRITE_ATTACKER_Z },
        },
        0,
      ),
  ).chain(
    tween(model, (t) =>
      t.to({ animation: { frame: 1 }, position: { x: "-200" } }, 100),
    ),
  );
}
