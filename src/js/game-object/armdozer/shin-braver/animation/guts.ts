import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/**
 * ガッツ
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function guts(
  model: ShinBraverModel,
  sounds: ShinBraverSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "GUTS_UP";
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          200,
        ),
      ),
    )
    .chain(delay(500))
    .chain(
      onStart(() => {
        model.animation.type = "GUTS_DOWN";
        model.animation.frame = 0;
        sounds.motor.play();
      }),
    )
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          200,
        ),
      ),
    );
}
