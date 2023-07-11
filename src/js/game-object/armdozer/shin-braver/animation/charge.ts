import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";
import {ARMDOZER_SPRITE_ATTACKER_Z} from "../../position";

/**
 * チャージ
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function charge(
  model: ShinBraverModel,
  sounds: ShinBraverSounds,
): Animate {
  return process(() => {
    model.animation.type = "SP_CHARGE";
    model.animation.frame = 0;
    model.position.z = ARMDOZER_SPRITE_ATTACKER_Z;
    sounds.motor.play();
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        250,
      ),
    ),
  );
}
