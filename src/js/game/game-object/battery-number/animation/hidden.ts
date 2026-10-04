import { Animate } from "../../../../animation/object-animation/animate";
import { tween } from "../../../../animation/object-animation/tween";
import { BatteryNumberProps } from "../props/battery-number-props";

/**
 * バッテリー数字を消す
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hidden(props: BatteryNumberProps): Animate {
  const { model } = props;
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
