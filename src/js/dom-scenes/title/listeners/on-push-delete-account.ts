import type { PushDOM } from "../../../dom/event-stream";
import type { TitleProps } from "../props";

/**
 * アカウント削除を押した時の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onPushDeleteAccount(props: TitleProps, action: Readonly<PushDOM>): void {
  action.event.preventDefault();
  props.changeValue.play();
  props.pushDeleteAccount.next();
}