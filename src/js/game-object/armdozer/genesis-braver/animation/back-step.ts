import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import { GenesisBraverModel } from "../model/genesis-braver-model";
import { GenesisBraverSounds } from "../sounds/genesis-braver-sounds";

/**
 * バックステップ
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function backStep(
  model: GenesisBraverModel,
  sounds: GenesisBraverSounds,
): Animate {
  return process(() => {
    model.animation.type = "BACK_STEP";
    model.animation.frame = 0;
    sounds.motor.sound.play();
  })
    .chain(
      all(
        tween(model.animation, (t) =>
          t.to(
            {
              frame: 1,
            },
            200,
          ),
        ),
        tween(model.position, (t) =>
          t.to(
            {
              x: "+100",
            },
            200,
          ),
        ),
      ),
    )
    .chain(delay(300))
    .chain(
      process(() => {
        sounds.motor.sound.play();
      }),
    )
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
      process(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
      }),
    );
}
