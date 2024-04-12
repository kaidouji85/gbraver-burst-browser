import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { PilotButtonAnimationProps } from "./animation-props";

/**
 * パイロットボタンを表示する
 * @param props アニメーションプロパティ
 * @param canPilot パイロットボタン利用可能フラグ
 * @return アニメーション
 */
export function open(
  props: PilotButtonAnimationProps,
  canPilot: boolean,
): Animate {
  const { model } = props;
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    model.canActivatePilotSkill = canPilot;
    model.opacity = 0;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
          },
          200,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.shouldPushNotifierStop = false;
      }),
    );
}
