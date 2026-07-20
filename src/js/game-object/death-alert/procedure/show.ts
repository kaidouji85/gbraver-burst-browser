import { opacity } from "../animation/opacity";
import { DeathAlertProps } from "../props/death-alert-props";

/**
 * 表示する
 * @param props プロパティ
 * @param duration 表示にかかる時間
 */
export const show = (props: DeathAlertProps, duration: number): void => {
  props.tweenGroup.update();
  props.tweenGroup.removeAll();
  opacity(props.model, 1, duration).play({ group: props.tweenGroup });
};
