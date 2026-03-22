import { DOMDialog } from "../dialog";
import { createLocalBattleHostDialogProps } from "./procedures/create-local-battle-host-dialog-props";
import { LocalBattleHostDialogProps } from "./props";

/** ローカル対戦ホストダイアログ */
export class LocalBattleHostDialog implements DOMDialog {
  /** プロパティ */
  #props: LocalBattleHostDialogProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createLocalBattleHostDialogProps();
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
