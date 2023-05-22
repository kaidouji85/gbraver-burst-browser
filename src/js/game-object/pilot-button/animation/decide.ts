import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import type { PilotButtonModel } from "../model/pilot-button-model";
import { PilotButtonSounds } from "../sounds/pilot-button-sounds";

/**
 * ボタンクリック
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function decide(
  model: PilotButtonModel,
  sounds: PilotButtonSounds
): Animate {
  return process(() => {
    model.isPushNotifierDisabled = true;
    sounds.pushButton.play();
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1.1,
          },
          100
        )
      )
    )
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1,
          },
          100
        )
      )
    );
}
