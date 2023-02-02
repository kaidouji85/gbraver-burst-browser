import { DOMDialog } from "../dialog";
import { createNetBattleSelectrProps, NetBattleSelectrProps } from "./props";

/** ネットバトルセレクター */
export class NetBattleSelector implements DOMDialog {
  /** プロパティ */
  #props: NetBattleSelectrProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createNetBattleSelectrProps();
  }

  /** @override  */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
