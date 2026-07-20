import { opacity } from "../animation/show";
import { DeathAlertProps } from "../props/death-alert-props";

/**
 * 非表示にする
 * @param props プロパティ
 * @param duration 非表示にかかる時間
 */
export const hidden = (props: DeathAlertProps, duration: number): void => {
  props.tweenGroup.update();
  props.tweenGroup.removeAll();
  opacity(props.model, 0, duration).play({ group: props.tweenGroup });
};
