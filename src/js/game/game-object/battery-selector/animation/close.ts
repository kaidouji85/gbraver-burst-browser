import { Animate } from "../../../../animation/object-animation/animate";
import { onStart } from "../../../../animation/object-animation/on-start";
import { tween } from "../../../../animation/object-animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/**
 * バッテリーセレクタを閉じる
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function close(props: BatterySelectorAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    model.opacity = 1;
  }).chain(
    tween(model, (t) =>
      t.to(
        {
          opacity: 0,
        },
        200,
      ),
    ),
  );
}
