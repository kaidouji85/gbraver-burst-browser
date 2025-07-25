import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_FRONT_Z } from "../../../td-position";
import { NeoLandozerAnimationProps } from "./animation-props";

/**
 * チャージ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function charge(props: NeoLandozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model, (t) =>
    t
      .to(
        {
          animation: { frame: 0 },
          position: { z: ARMDOZER_SPRITE_FRONT_Z },
        },
        0,
      )
      .onStart(() => {
        model.animation.type = "HM_CHARGE";
        se.play(sounds.motor);
      }),
  ).chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300)));
}
