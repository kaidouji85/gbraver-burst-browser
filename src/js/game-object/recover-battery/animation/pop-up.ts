import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { RecoverBatteryAnimationProps } from "./animation-props";

/**
 * バッテリー回復 ポップアップ
 * @param props アニメーションプロパティ
 * @param value 回復値
 * @return アニメーション
 */
export function popUp(
  props: RecoverBatteryAnimationProps,
  value: number,
): Animate {
  return show(props, value).chain(delay(600)).chain(hidden(props));
}

/**
 * 表示
 * @param props アニメーションプロパティ
 * @param value 回復値
 * @return アニメーション
 */
export function show(
  props: RecoverBatteryAnimationProps,
  value: number,
): Animate {
  const { model, sounds } = props;
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
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function hidden(props: RecoverBatteryAnimationProps): Animate {
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
