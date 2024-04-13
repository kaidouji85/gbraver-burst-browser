import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import {BatteryNumberProps} from "../props/battery-number-props";

/**
 * バッテリー数字を表示する
 * @param props アニメーションプロパティ
 * @param battery バッテリー値
 * @return アニメーション
 */
export function show(props: BatteryNumberProps, battery: number): Animate {
  const { model } = props;
  return onStart(() => {
    model.opacity = 0;
    model.scale = 1.2;
    model.battery = battery;
  }).chain(
    tween(model, (t) =>
      t.to(
        {
          opacity: 1,
          scale: 1,
        },
        300,
      ),
    ),
  );
}
