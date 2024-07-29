import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_ATTACKER_Z } from "../../position";
import { GenesisBraverAnimationProps } from "./animation-props";

/**
 * チャージ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function charge(props: GenesisBraverAnimationProps): Animate {
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
        model.animation.type = "SP_CHARGE";
        se.play(sounds.motor);
      }),
  ).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        250,
      ),
    ),
  );
}
