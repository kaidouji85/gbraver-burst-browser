import { toggle } from "../animation/toggle";
import { getNextTimeScale } from "../model/next-time-scale";
import { TimeScaleButtonProps } from "../props/time-scale-button-props";

/**
 * ボタン押下時の処理
 * @param props プロパティ
 */
export function onButtonPush(props: TimeScaleButtonProps) {
  const { model, toggleTween, toggleNotify, disabled } = props;
  if (model.shouldPushNotifierStop || disabled) {
    return;
  }

  toggleTween.update();
  toggleTween.removeAll();
  const nextTimeScale = getNextTimeScale(model.timeScale);
  toggle(props, nextTimeScale).play(toggleTween);
  toggleNotify.next(nextTimeScale);
}
