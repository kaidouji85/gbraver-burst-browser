import { Resources } from "../../resource";
import { DOMDialog } from "../dialog";
import { createNetBattleSelectrProps, NetBattleSelectrProps } from "./props";

/** ネットバトルセレクター */
export class NetBattleSelector implements DOMDialog {
  /** プロパティ */
  #props: NetBattleSelectrProps;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createNetBattleSelectrProps(resources);
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
