import { PushDOM } from "../../../dom/event-stream";
import { NetBattleSelectrProps } from "../props";

/**
 * カジュアルマッチボタンを押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCasualMatchPush(
  props: NetBattleSelectrProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  console.log("push");
}
