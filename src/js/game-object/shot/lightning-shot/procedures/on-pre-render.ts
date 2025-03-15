import { PreRender } from "../../../../game-loop/pre-render";
import { LightningShotProps } from "../props/lightning-shot-props";

/**
 * プリレンダー時の処理
 * @param options オプション
 * @param options.props 電撃ショットプロパティ
 * @param options.action アクション
 */
export function onPreRender(options: {
  props: LightningShotProps;
  action: PreRender;
}) {
  const { view } = options.props;
  const { camera } = options.action;
  view.lookAt(camera);
}
