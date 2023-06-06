import {
  NEXT_MESSAGE_ICON_CLASS,
  NEXT_MESSAGE_ICON_CLASS_INVISIBLE,
} from "../dom/class-name";
import { MessageWindowProps } from "../props";

/**
 * 次メッセージアイコンの表示、非表示設定
 * @param props メッセージウインドウのプロパティ
 * @param isNextMessageIconVisible 次メッセージアイコンを表示するか、trueで表示する
 */
export function nextMessageIconVisible(
  props: Readonly<MessageWindowProps>,
  isNextMessageIconVisible: boolean
): void {
  props.nextMessageIcon.className = isNextMessageIconVisible
    ? NEXT_MESSAGE_ICON_CLASS
    : NEXT_MESSAGE_ICON_CLASS_INVISIBLE;
}
