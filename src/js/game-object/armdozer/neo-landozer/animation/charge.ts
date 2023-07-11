import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_ATTACKER_Z } from "../../position";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";

/**
 * チャージ
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function charge(
  model: NeoLandozerModel,
  sounds: NeoLandozerSounds,
): Animate {
  return process(() => {
    model.animation.type = "HM_CHARGE";
    model.animation.frame = 0;
    model.position.z = ARMDOZER_SPRITE_ATTACKER_Z;
    sounds.motor.play();
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        300,
      ),
    ),
  );
}
