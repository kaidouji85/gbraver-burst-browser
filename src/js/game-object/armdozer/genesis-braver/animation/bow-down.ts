import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import { GenesisBraverModel } from "../model/genesis-braver-model";
import { GenesisBraverSounds } from "../sounds/genesis-braver-sounds";

/**
 * 礼（倒れる）
 * @param model ジェネシスブレイバーモデル
 * @param sounds ジェネシスブレイバーサウンド
 * @return アニメーション
 */
export function bowDown(
  model: GenesisBraverModel,
  sounds: GenesisBraverSounds,
): Animate {
  return process(() => {
    model.animation.type = "BOW";
    model.animation.frame = 0;
    sounds.motor.sound.play();
  }).chain(
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
