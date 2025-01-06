import { Update } from "../../../../game-loop/update";
import { GranDozerProps } from "../props/gran-dozer-props";

/** オプション */
type Options = {
  /** アクション */
  action: Update;
  /** プロパティ */
  props: GranDozerProps;
};

/**
 * アップデート時の処理
 * @param options オプション
 */
export function onUpdate(options: Options) {
  const { view, model } = options.props;
  view.engage(model);
}
