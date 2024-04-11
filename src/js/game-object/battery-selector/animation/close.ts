import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { BatterySelectorAnimationProps } from "./animation-props";

/**
 * バッテリーセレクタを閉じる
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function close(props: BatterySelectorAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.isPushNotifierDisabled = true;
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
