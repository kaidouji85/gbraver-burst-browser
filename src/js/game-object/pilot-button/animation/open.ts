import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { PilotButtonModel } from "../model/pilot-button-model";

/**
 * パイロットボタンを表示する
 *
 * @param model モデル
 * @param canPilot パイロットボタン利用可能フラグ
 * @return アニメーション
 */
export function open(model: PilotButtonModel, canPilot: boolean): Animate {
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    model.canActivatePilotSkill = canPilot;
    model.opacity = 0;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
          },
          200,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.shouldPushNotifierStop = false;
      }),
    );
}
