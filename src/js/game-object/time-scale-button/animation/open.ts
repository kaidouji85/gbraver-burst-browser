import type { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import type { TimeScaleButtonModel } from "../model/time-scale-button-model";

/**
 * ボタンを表示する
 *
 * @param model モデル
 * @param timeScale タイムスケール値
 * @return アニメーション
 */
export function open(model: TimeScaleButtonModel, timeScale: number): Animate {
  return process(() => {
    model.disabled = true;
    model.opacity = 0;
    model.timeScale = timeScale;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
          },
          200
        )
      )
    )
    .chain(
      process(() => {
        model.disabled = false;
      })
    );
}
