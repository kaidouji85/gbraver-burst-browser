import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatterySelectorOpenParam } from "../battery-selector-open-param";
import type { BatterySelectorModel } from "../model";
import { getNeedleValue } from "../model/needle-value";

/**
 * ボタン表示アニメーション
 * @param model モデル
 * @param param ボタン表示パラメータ
 * @return アニメーション
 */
export function open(
  model: BatterySelectorModel,
  param: BatterySelectorOpenParam,
): Animate {
  return onStart(() => {
    model.isPushNotifierDisabled = true;
    model.opacity = 0;
    model.battery = param.initialValue;
    model.maxBattery = param.maxBattery;
    model.needle = getNeedleValue(param.initialValue, param.maxBattery);
    model.enableMaxBattery = Math.min(param.enableMaxBattery, model.maxBattery);
    model.label = param.label;
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
        model.isPushNotifierDisabled = false;
      }),
    );
}
