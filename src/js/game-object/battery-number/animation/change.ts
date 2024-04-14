import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatteryNumberProps } from "../props/battery-number-props";

/**
 * 数字を変更する
 * @param props アニメーションプロパティ
 * @param battery 変更する値
 * @return アニメーション
 */
export function change(props: BatteryNumberProps, battery: number): Animate {
  const { model } = props;
  return onStart(() => {
    model.battery = battery;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1.2,
          },
          200,
        ),
      ),
    )
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1,
          },
          200,
        ),
      ),
    );
}
