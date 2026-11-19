import { PrivateMatchGuestDialogProps } from "../props";
import { startPrivateMatch } from "./start-private-match";

/**
 * ルームID入力フォームがsubmitされた時の処理
 * テキスト入力でのEnterやキーボードによる送信ボタン操作でsubmitされる
 * @param props ダイアログプロパティ
 * @param event submitイベント
 */
export function onRoomIDFormSubmit(
  props: PrivateMatchGuestDialogProps,
  event: SubmitEvent,
): void {
  event.preventDefault();
  event.stopPropagation();
  props.exclusive.execute(async () => {
    await startPrivateMatch(props);
  });
}
