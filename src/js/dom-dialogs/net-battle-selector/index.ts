import { DOMDialog } from "../dialog";

/** ネットバトルセレクター */
export class NetBattleSelector implements DOMDialog {
  /** ルートHTML要素 */
  #root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#root = document.createElement("div");
  }

  /**@override  */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
