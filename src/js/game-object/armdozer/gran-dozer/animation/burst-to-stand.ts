import { delay } from "../../../../animation/delay";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_ATTACKER_Z } from "../../../td-position";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * バースト -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function burstToStand(props: GranDozerAnimationProps) {
  const { model, sounds, se } = props;
  return tween(model, (t) =>
    t
      .to(
        {
          animation: { frame: 1 },
          position: { z: ARMDOZER_SPRITE_ATTACKER_Z },
        },
        0,
      )
      .onStart(() => {
        model.animation.type = "BURST_DOWN";
        se.play(sounds.motor);
      }),
  )
    .chain(tween(model.animation, (t) => t.to({ frame: 0 }, 300)))
    .chain(
      tween(model, (t) =>
        t
          .onStart(() => {
            model.animation.type = "BURST_UP";
          })
          .to({ animation: { frame: 1 } }, 0),
      ),
    )
    .chain(delay(300))
    .chain(
      tween(model, (t) =>
        t
          .onStart(() => {
            se.play(sounds.motor);
          })
          .to({ animation: { frame: 0 } }, 300),
      ),
    )
    .chain(
      tween(model, (t) =>
        t
          .onStart(() => {
            model.animation.type = "STAND";
          })
          .to({ animation: { frame: 0 } }, 0),
      ),
    );
}
