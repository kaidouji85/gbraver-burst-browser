import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { GenesisBraverModel } from "../model/genesis-braver-model";
import { GenesisBraverSounds } from "../sounds/genesis-braver-sounds";

/**
 * 気をつけ -> 立ち
 * @param model ジェネシスブレイバーモデル
 * @param sounds ジェネシスブレイバーサウンド
 * @return アニメーション
 */
export function uprightToStand(
  model: GenesisBraverModel,
  sounds: GenesisBraverSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "UPRIGHT";
    model.animation.frame = 1;
    sounds.motor.sound.play();
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
        model.animation.type = "STAND";
        model.animation.frame = 0;
      }),
    );
}
