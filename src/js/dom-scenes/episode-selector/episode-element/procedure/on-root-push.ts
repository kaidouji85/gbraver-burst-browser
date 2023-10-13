import { PushDOM } from "../../../../dom/push-dom";
import { EpisodeElementProps } from "../props";

/**
 * ルートHTML要素を押した時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onRootPush(
  props: Readonly<EpisodeElementProps>,
  action: Readonly<PushDOM>,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.select.next();
}
