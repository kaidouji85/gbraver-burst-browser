import { MessageWindowProps } from "../props";

/**
 * メッセージをinnerHTMLで指定する
 * @param props コンポネントプロパティ
 * @param innerHTML 指定するHTML
 */
export function messagesInInnerHtml(
  props: Readonly<MessageWindowProps>,
  innerHTML: string,
) {
  props.messages.innerHTML = innerHTML;
}
