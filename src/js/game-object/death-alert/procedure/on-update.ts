import { Update } from "../../../game-loop/update";
import { DeathAlertProps } from "../props/death-alert-props";

/**
 * アップデート時の処理
 * @param props プロパティ
 * @param action アクション
 */
export const onUpdate = (props: DeathAlertProps, action: Update) => {
  props.tweenGroup.update(action.time);
  props.view.engage(props.model);
};
