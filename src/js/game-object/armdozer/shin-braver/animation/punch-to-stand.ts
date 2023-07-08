import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/** ストレートパンチ -> 立ち */
export function punchToStand(
  model: ShinBraverModel,
  sounds: ShinBraverSounds,
): Animate {
  return process(() => {
    model.animation.type = "SP_TO_STAND";
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          400,
        ),
      ),
      tween(model.position, (t) =>
        t.to(
          {
            x: "+80",
          },
          400,
        ),
      ),
    )
    .chain(
      process(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
      }),
    );
}
