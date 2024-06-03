import { PreRender } from "../../../game-loop/pre-render";
import { BurstButtonProps } from "../props/burst-button-props";

/**
 * プリレンダー時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPreRender(props: BurstButtonProps, action: PreRender) {
  const { view, model } = props;
  view.engage(model, action);
}
