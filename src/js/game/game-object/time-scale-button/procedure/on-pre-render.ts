import { PreRender } from "../../../game-loop/pre-render";
import { TimeScaleButtonProps } from "../props/time-scale-button-props";

/**
 * プリレンダー時の処置
 * @param props プロパティ
 * @param action アクション
 */
export function onPreRender(props: TimeScaleButtonProps, action: PreRender) {
  const { view, model } = props;
  view.engage(model, action);
}
