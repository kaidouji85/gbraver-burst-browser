import { PushDOM } from "../../../../dom/push-dom";
import { EpisodeElementProps } from "../props";

/**
 * ルートHTML要素を押した時の処理
 * @param options オプション
 * @param options.props プロパティ
 * @param options.action アクション
 */
export function onRootPush(options: {
  props: Readonly<EpisodeElementProps>;
  action: Readonly<PushDOM>;
}): void {
  const { props } = options;
  props.select.next();
}
