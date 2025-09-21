import { PreRender } from "../../../game-loop/pre-render";
import { StatusIconProps } from "../props/status-icon-props";

/**
 * プリレンダー時の処理
 * @param options オプション
 */
export function onPreRender(options: {
  /** ステータスアイコンのプロパティ */
  props: StatusIconProps;
  /** プリレンダー情報 */
  action: PreRender;
}) {
  const { props, action } = options;
  props.view.engage(props.model, action);
}
