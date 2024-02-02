import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";

/** アームハンマー -> 立ち */
export function hmToStand(
  model: NeoLandozerModel,
  sounds: NeoLandozerSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "HM_TO_STAND";
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          300,
        ),
      ),
      tween(model.position, (t) =>
        t.to(
          {
            x: "+100",
          },
          300,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
        model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
      }),
    );
}
