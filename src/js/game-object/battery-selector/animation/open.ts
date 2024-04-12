import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatterySelectorOpenParam } from "../battery-selector-open-param";
import { getNeedleValue } from "../model/needle-value";
import { BatterySelectorAnimationProps } from "./animation-props";

/**
 * ボタン表示アニメーション
 * @param props アニメーションプロパティ
 * @param param ボタン表示パラメータ
 * @return アニメーション
 */
export function open(
  props: BatterySelectorAnimationProps,
  param: BatterySelectorOpenParam,
): Animate {
  const { model } = props;
  return onStart(() => {
    model.shouldPushNotifierStop = true;
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
        model.shouldPushNotifierStop = false;
      }),
    );
}
