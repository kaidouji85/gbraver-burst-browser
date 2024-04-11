import { PreRender } from "../../../../game-loop/pre-render";
import { ShinBraverProps } from "../props/shin-braver-props";

/**
 * プリレンダー時の処理
 * @param props ゲームオブジェクトプロパティ
 * @param action アクション
 */
export function onPreRender(props: ShinBraverProps, action: PreRender) {
  const { view } = props;
  view.lookAt(action.camera);
}