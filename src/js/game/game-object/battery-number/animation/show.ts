import { Animate } from "../../../../animation/object-animation/animate";
import { onStart } from "../../../../animation/object-animation/on-start";
import { tween } from "../../../../animation/object-animation/tween";
import { BatteryNumberProps } from "../props/battery-number-props";

/**
 * バッテリー数字を表示する
 * @param props アニメーションプロパティ
 * @param battery バッテリー値
 * @returns アニメーション
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
