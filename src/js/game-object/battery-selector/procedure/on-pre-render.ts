import { PreRender } from "../../../game-loop/pre-render";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * プリレンダー
 * @param props ゲームオブジェクトプロパティ
 * @param action アクション
 */
export function onPreRender(
  props: Readonly<BatterySelectorProps>,
  action: PreRender,
): void {
  props.view.engage(props.model, action);
}
