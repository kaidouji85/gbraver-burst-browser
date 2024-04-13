import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { ARMDOZER_EFFECT_STANDARD_Y } from "../../armdozer/position";
import { BatteryCorrectAnimationProps } from "./animation-props";

/**
 * ポップアップ表示
 * @param props アニメーションプロパティ
 * @param value バッテリー補正の値
 * @return アニメーション
 */
export function popUp(
  props: BatteryCorrectAnimationProps,
  value: number,
): Animate {
  const { model } = props;
  return onStart(() => {
    model.position.y = ARMDOZER_EFFECT_STANDARD_Y + 80;
    model.opacity = 1;
    model.correctValue = value;
  }).chain(
    all(
      tween(model.position, (t) =>
        t.to(
          {
            y: "+10",
          },
          1000,
        ),
      ),
      tween(model, (t) =>
        t.to(
          {
            opacity: 0,
          },
          1000,
        ),
      ),
    ),
  );
}
