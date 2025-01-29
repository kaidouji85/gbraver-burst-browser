import { PushDOM } from "../../../dom/push-dom";

/**
 * バトル終了確認ダイアログを押した時の処理
 * @param action アクション
 */
export function onEndBattleConfirmDialogPush(action: PushDOM) {
  // ダイアログ内で発生したイベントが、親要素に伝播しないようにする
  action.event.stopPropagation();
  action.event.preventDefault();
}
