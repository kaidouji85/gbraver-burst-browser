import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { PilotButtonModel } from "../model/pilot-button-model";
import { PilotButtonSounds } from "../sounds/pilot-button-sounds";

/**
 * ボタンクリック
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function decide(
  model: PilotButtonModel,
  sounds: PilotButtonSounds,
): Animate {
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    sounds.pushButton.sound.play();
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1.1,
          },
          100,
        ),
      ),
    )
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1,
          },
          100,
        ),
      ),
    );
}
