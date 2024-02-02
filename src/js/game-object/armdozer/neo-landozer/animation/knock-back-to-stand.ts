import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import type { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";

/** ノックバック -> 立ち */
export function knockBackToStand(
  model: NeoLandozerModel,
  sounds: NeoLandozerSounds,
): Animate {
  return onStart(() => {
    model.animation.frame = 1;
    model.animation.type = "KNOCK_BACK";
    sounds.motor.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          300,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.frame = 0;
        model.animation.type = "STAND";
      }),
    );
}
