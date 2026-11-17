import { PrivateMatchGuestDialogProps } from "../props";
import { startPrivateMatch } from "./start-private-match";

/**
 * ルームID入力フォームがsubmitされた時の処理
 * テキスト入力でEnterを押すと、ブラウザの暗黙送信でsubmitされる
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
