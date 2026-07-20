import { PreRender } from "../../../game-loop/pre-render";
import { DeathAlertProps } from "../props/death-alert-props";

/**
 * プリレンダー時の処理
 * @param props プロパティ
 * @param action アクション
 */
export const onPreRender = (
  props: DeathAlertProps,
  action: PreRender,
): void => {
  props.model.width = action.rendererDOM.clientWidth;
  props.model.height = action.rendererDOM.clientHeight;
  props.view.engage(props.model);
};
