import { DOMDialog } from "../dialog";
import { createLocalBattleSelectorProps } from "./procedures/create-local-battle-selector-props";
import { LocalBattleSelectorProps } from "./props";

/** ローカル対戦セレクターダイアログ */
export class LocalBattleSelectorDialog implements DOMDialog {
  /** プロパティ */
  #props: LocalBattleSelectorProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createLocalBattleSelectorProps();
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
