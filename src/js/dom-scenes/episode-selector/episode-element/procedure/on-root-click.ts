import { PushDOM } from "../../../../dom/push-dom";
import { EpisodeElementProps } from "../props";

/**
 * ルートHTML要素をクリック時の処理
 * @param options オプション
 * @param options.props プロパティ
 * @param options.action アクション
 */
export function onRootClick(options: {
  props: Readonly<EpisodeElementProps>;
  action: Readonly<PushDOM>;
}): void {
  const { props, action } = options;
  action.event.preventDefault();
  action.event.stopPropagation();
  props.select.next();
}
