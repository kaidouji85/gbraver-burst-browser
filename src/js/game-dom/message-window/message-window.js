// @flow

/** メッセージウインドウ */
export class MessageWindow {
  #root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#root = document.createElement('div');
    this.#root.innerText = 'message window';
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