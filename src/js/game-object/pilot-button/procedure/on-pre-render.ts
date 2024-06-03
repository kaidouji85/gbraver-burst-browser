import { PreRender } from "../../../game-loop/pre-render";
import { PilotButtonProps } from "../props/pilot-button-props";

/**
 * プリレンダー時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPreRender(props: PilotButtonProps, action: PreRender) {
  const { view, model } = props;
  view.engage(model, action);
}
