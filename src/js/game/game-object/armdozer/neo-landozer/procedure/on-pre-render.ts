import { PreRender } from "../../../../game-loop/pre-render";
import { NeoLandozerProps } from "../props/neo-landozer-props";

/**
 * プリレンダー時の処理
 * @param props ゲームオブジェクトプロパティ
 * @param action アクション
 */
export function onPreRender(props: NeoLandozerProps, action: PreRender) {
  const { view } = props;
  view.lookAt(action.camera);
}
