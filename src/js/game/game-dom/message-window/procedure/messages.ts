import { ROOT_CLASS } from "../dom/class-name";
import { MessageWindowProps } from "../props";

/**
 * メッセージを配列形式で設定する
 * 配列の区切れで改行をする
 * @param props コンポネントプロパティ
 * @param values メッセージ
 */
export function messages(
  props: Readonly<MessageWindowProps>,
  values: string[],
): void {
  const createParagraph = (message: string) => {
    const div = document.createElement("div");
    div.className = `${ROOT_CLASS}__paragraph`;
    div.innerHTML = message;
    return div;
  };

  props.messages.innerHTML = "";
  const paragraphs = values.map((message) => createParagraph(message));
  const lastParagraph: HTMLElement | null | undefined =
    paragraphs[paragraphs.length - 1];

  if (!lastParagraph) {
    return;
  }

  paragraphs
    .filter((v) => v !== lastParagraph)
    .forEach((paragraph) => {
      props.messages.appendChild(paragraph);
    });
  lastParagraph.appendChild(props.nextMessageIcon);
  props.messages.appendChild(lastParagraph);
}
