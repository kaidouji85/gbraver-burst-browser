import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/**
 * 礼（起き上がる）
 * @param model シンブレイバーモデル
 * @param sound シンブレイバーサウンド
 * @return アニメーション
 */
export function bowUp(
  model: ShinBraverModel,
  sounds: ShinBraverSounds,
): Animate {
  return process(() => {
    model.animation.type = "BOW";
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
      process(() => {
        model.animation.type = "UPRIGHT";
        model.animation.frame = 1;
      }),
    );
}
