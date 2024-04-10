import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { RecoverBatteryModel } from "../model/recover-battery-model";
import RecoverBatterySounds from "../sounds/recover-battery-sounds";

/**
 * バッテリー回復 ポップアップ
 *
 * @param model モデル
 * @param sounds 効果音
 * @param value 回復値
 * @return アニメーション
 */
export function popUp(
  model: RecoverBatteryModel,
  sounds: RecoverBatterySounds,
  value: number,
): Animate {
  return show(model, sounds, value).chain(delay(600)).chain(hidden(model));
}

/**
 * 表示
 * @param model モデル
 * @param sounds 効果音
 * @param value 回復値
 * @return アニメーション
 */
export function show(
  model: RecoverBatteryModel,
  sounds: RecoverBatterySounds,
  value: number,
): Animate {
  return onStart(() => {
    model.scale = 1.2;
    model.value = value;
    model.opacity = 0;
    sounds.recoverBattery.sound.play();
  }).chain(
    tween(model, (t) =>
      t.to(
        {
          opacity: 1,
          scale: 1,
        },
        400,
      ),
    ),
  );
}

/**
 * 非表示
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: RecoverBatteryModel): Animate {
  return tween(model, (t) =>
    t.to(
      {
        opacity: 0,
        scale: 1.1,
      },
      200,
    ),
  );
}
