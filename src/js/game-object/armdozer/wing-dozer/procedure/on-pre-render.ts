import { PreRender } from "../../../../game-loop/pre-render";
import { WingDozerProps } from "../props/wing-dozer-props";

/**
 * プリレンダー時の処理
 * @param props ゲームオブジェクトプロパティ
 * @param action アクション
 */
export function onPreRender(props: WingDozerProps, action: PreRender) {
  const { view } = props;
  view.lookAt(action.camera);
}
