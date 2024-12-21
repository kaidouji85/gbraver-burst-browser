import { PreRender } from "../../../../game-loop/pre-render";
import { GranDozerProps } from "../props/gran-dozer-props";

/** オプション */
type Options = {
  /** アクション */
  action: PreRender;
  /** プロパティ */
  props: GranDozerProps;
};

/**
 * プリレンダー時の処理
 * @param options オプション
 */
export function onPreRender(options: Options) {
  const { action } = options;
  const { view } = options.props;
  view.lookAt(action.camera);
}
