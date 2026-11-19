import { PushDOM } from "../../../../dom/push-dom";
import { PrivateMatchGuestDialogProps } from "../props";
import { startPrivateMatch } from "./start-private-match";

/**
 * プライベートマッチ開始ボタンが押された時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onEnterButtonPush(
  props: PrivateMatchGuestDialogProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    await startPrivateMatch(props);
  });
}
