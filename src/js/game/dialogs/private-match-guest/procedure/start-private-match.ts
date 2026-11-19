import { pop } from "../../../../dom/pop";
import { PrivateMatchGuestDialogProps } from "../props";

/**
 * 入力されたルームIDでプライベートマッチを開始する
 * @param props ダイアログプロパティ
 * @returns 開始通知が完了したら解決するPromise
 */
export async function startPrivateMatch(
  props: PrivateMatchGuestDialogProps,
): Promise<void> {
  props.se.play(props.pushButton);
  await pop(props.enterButton);
  props.privateMatchStart.next(props.roomID.value);
}
