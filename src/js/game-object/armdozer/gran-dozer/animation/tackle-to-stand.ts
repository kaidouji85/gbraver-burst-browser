import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { tween } from "../../../../animation/tween";
import {
  ARMDOZER_SPRITE_ATTACKER_Z,
  ARMDOZER_SPRITE_STANDARD_X,
  ARMDOZER_SPRITE_STANDARD_Z,
} from "../../position";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * タックル -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function tackleToStand(props: GranDozerAnimationProps): Animate {
  const { model, se, sounds } = props;
  return tween(model, (t) =>
    t
      .onStart(() => {
        model.animation.type = "ATTACK_TO_NEUTRAL";
        se.play(sounds.motor);
      })
      .to(
        {
          animation: { frame: 0 },
          position: { z: ARMDOZER_SPRITE_ATTACKER_Z },
        },
        0,
      ),
  )
    .chain(
      tween(model, (t) =>
        t.to(
          {
            animation: { frame: 1 },
            position: { x: ARMDOZER_SPRITE_STANDARD_X },
          },
          300,
        ),
      ),
    )
    .chain(delay(300))
    .chain(
      tween(model, (t) =>
        t
          .onStart(() => {
            model.animation.type = "NEUTRAL_TO_STAND";
            se.play(sounds.motor);
          })
          .to(
            {
              animation: { frame: 0 },
            },
            0,
          ),
      ),
    )
    .chain(
      tween(model, (t) =>
        t
          .onStart(() => {
            model.animation.type = "STAND";
          })
          .to(
            {
              animation: { frame: 0 },
              position: { z: ARMDOZER_SPRITE_STANDARD_Z },
            },
            0,
          ),
      ),
    );
}
