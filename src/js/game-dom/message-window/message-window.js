// @flow
import {domUuid} from "../../uuid/dom-uuid";

/** ルートHTML要素のclass属性 */
const ROOT_CLASS = 'message-window';

/** ルートHTML要素が非表示の際のclass属性 */
const ROOT_CLASS_INVISIBLE = `${ROOT_CLASS}--invisible`;

/** data-idを集めたもの */
type DataIDs = {messages: string};

/**
 * ルートHTML要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT_CLASS}__messages" data-id="${ids.messages}"></div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  messages: HTMLElement
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const messages = root.querySelector(`[data-id="${ids.messages}"]`) ?? document.createElement('div');
  return {messages};
}

/** メッセージウインドウ */
export class MessageWindow {
  #root: HTMLElement;
  #messages: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    const ids = {messages: domUuid()};
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(ids);
    const {messages} = extractElements(this.#root, ids);
    this.#messages = messages;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 表示、非表示を設定する
   *
   * @param isVisible trueで表示する
   */
  visible(isVisible: boolean): void {
    this.#root.className = isVisible ? ROOT_CLASS : ROOT_CLASS_INVISIBLE;
  }

  /**
   * メッセージを配列形式で設定する
   * 配列の区切れで改行をする
   *
   * @param values メッセージ
   */
  messages(values: string[]): void {
    const createParagraph = (message: string) => {
      const div = document.createElement('div');
      div.className = `${ROOT_CLASS}__messages__paragraph`;
      div.innerText = message;
      return div;
    };

    this.#messages.innerHTML = "";
    values.forEach(message => {
      this.#root.appendChild(createParagraph(message));
    });
  }
}