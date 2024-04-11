import { PreRender } from "../../../../game-loop/pre-render";
import { GenesisBraverProps } from "../props/genesis-braver-props";

/**
 * プリレンダー時の処理
 * @param props ゲームオブジェクトプロパティ
 * @param action アクション
 */
export function onPreRender(props: GenesisBraverProps, action: PreRender) {
  const { view } = props;
  view.lookAt(action.camera);
}