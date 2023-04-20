import { PushDOM } from "../../../dom/event-stream";

/**
 * バーストが押された時の処理
 * @param action アクション
 */
export function onBurstPush(action: PushDOM): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  console.log("burst"); // TODO イベント発火処理をかく
}