import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";

/**
 * ガッツ
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function guts(
  model: NeoLandozerModel,
  sounds: NeoLandozerSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "GUTS_UP";
    model.animation.frame = 0;
    sounds.motor.sound.play();
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
        sounds.motor.sound.play();
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
