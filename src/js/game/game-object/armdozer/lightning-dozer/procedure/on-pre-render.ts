import { PreRender } from "../../../../game-loop/pre-render";
import { LightningDozerProps } from "../props/lightning-dozer-props";

/**
 * プリレンダー時の処理
 * @param props ゲームオブジェクトプロパティ
 * @param action アクション
 */
export function onPreRender(
  props: LightningDozerProps,
  action: PreRender,
): void {
  const { view } = props;
  view.lookAt(action.camera);
}
