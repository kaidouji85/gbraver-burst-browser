import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_ATTACKER_Z } from "../../position";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * アームハンマーチャージ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hmCharge(props: GranDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
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
        model.animation.type = "HM_CHARGE";
        se.play(sounds.motor);
      }),
  ).chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300)));
}
