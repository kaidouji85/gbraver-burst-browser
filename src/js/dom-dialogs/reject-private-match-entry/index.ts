import { DOMDialog } from "../dialog";

/** プライベートマッチエントリ拒否ダイアログ */
export class RejectPrivateMatchEntryDialog implements DOMDialog {
  /** ルートHTML要素 */
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

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}