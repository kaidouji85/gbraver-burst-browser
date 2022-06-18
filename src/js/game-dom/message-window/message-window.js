// @flow
/** ルートHTML要素のclass属性 */
const ROOT_CLASS = 'message-window';

/** メッセージウインドウ */
export class MessageWindow {
  #root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}