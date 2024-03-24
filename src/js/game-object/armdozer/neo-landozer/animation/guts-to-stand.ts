import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";

/**
 * ターンスタート -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function gutsToStand(
  model: NeoLandozerModel,
  sounds: NeoLandozerSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "GUTS_DOWN";
    model.animation.frame = 1;
    sounds.motor.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          200,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "GUTS_UP";
        model.animation.frame = 1;
      }),
    )
    .chain(delay(500))
    .chain(
      onStart(() => {
        sounds.motor.play();
      }),
    )
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          200,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
      }),
    );
}
