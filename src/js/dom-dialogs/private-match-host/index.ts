import {DOMDialog} from "../dialog";

/** プライベートマッチホストダイアログ */
export class PrivateMatchHostDialog implements DOMDialog {
  /** ルート要素HTML */
  #root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#root = document.createElement("div");
  }

  /** @override */
  destructor(): void {
    // NOP
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