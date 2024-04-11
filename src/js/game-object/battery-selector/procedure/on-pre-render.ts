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
  const { view, model } = props;
  view.engage(model, action);
}
