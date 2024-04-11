import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { changeNeedle } from "../animation/change-needle";
import { getNeedleValue } from "../model/needle-value";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * バッテリー値を変更するヘルパー関数
 * @param props ゲームオブジェクトプロパティ
 * @param battery 変更するバッテリー値
 * @return アニメーション
 */
export function batteryChange(
  props: BatterySelectorProps,
  battery: number,
): Animate {
  props.batteryChangeTween.update();
  props.batteryChangeTween.removeAll();
  const needle = getNeedleValue(battery, props.model.maxBattery);
  return all(
    onStart(() => {
      props.model.battery = battery;
    }),
    changeNeedle(props.model, props.batteryChangeTween, needle),
  );
}
