import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_ATTACKER_Z } from "../../position";
import type { GenesisBraverModel } from "../model/genesis-braver-model";
import type { GenesisBraverSounds } from "../sounds/genesis-braver-sounds";

/**
 * チャージ
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function charge(
  model: GenesisBraverModel,
  sounds: GenesisBraverSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "SP_CHARGE";
    model.animation.frame = 0;
    model.position.z = ARMDOZER_SPRITE_ATTACKER_Z;
    sounds.motor.sound.play();
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
