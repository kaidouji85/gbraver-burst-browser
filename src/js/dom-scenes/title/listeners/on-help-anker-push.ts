import { PushDOM } from "../../../dom/event-stream";

/**
 * ヘルプメニューのanker要素を押した際のイベント
 * @param action アクション
 */
export function onHelpAnkerPush(action: Readonly<PushDOM>): void {
  action.event.stopPropagation();
}
