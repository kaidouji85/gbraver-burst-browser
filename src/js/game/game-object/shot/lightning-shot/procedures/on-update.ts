import { Update } from "../../../../game-loop/update";
import { LightningShotProps } from "../props/lightning-shot-props";

/**
 * アップデート時の処理
 * @param options オプション
 * @param options.props プロパティ
 * @param options.action アクション
 */
export function onUpdate(options: {
  props: LightningShotProps;
  action: Update;
}): void {
  const { model, view } = options.props;
  view.engage(model);
}
