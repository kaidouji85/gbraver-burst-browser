import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/**
 * バッテリー決定アニメーション
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function decide(
  props: BatterySelectorAnimationProps
): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    sounds.pushButtonSound.sound.play();
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            batteryButtonScale: 1.1,
          },
          100,
        ),
      ),
    )
    .chain(
      tween(model, (t) =>
        t.to(
          {
            batteryButtonScale: 1,
          },
          100,
        ),
      ),
    );
}
