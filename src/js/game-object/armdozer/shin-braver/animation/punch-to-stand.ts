import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import type { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/** 
 * ストレートパンチ -> 立ち
 * @param model シンブレイバーモデル
 * @param sounds シンブレイバーサウンド
 * @return アニメーション
 */
export function punchToStand(
  model: ShinBraverModel,
  sounds: ShinBraverSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "SP_TO_STAND";
    model.animation.frame = 0;
    sounds.motor.sound.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          400,
        ),
      ),
      tween(model.position, (t) =>
        t.to(
          {
            x: "+80",
          },
          400,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
        model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
      }),
    );
}
