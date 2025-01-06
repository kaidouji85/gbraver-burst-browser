import { PushDOM } from "../../../dom/push-dom";

/**
 * ヘルプメニューのanker要素を押した際のイベント
 * @param action アクション
 */
export function onHelpAnkerPush(action: Readonly<PushDOM>): void {
  action.event.stopPropagation();
}
