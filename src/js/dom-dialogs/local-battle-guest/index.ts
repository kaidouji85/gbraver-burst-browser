import { DOMDialog } from "../dialog";
import { createLocalBattleGuestDialogProps } from "./procedure/create-local-battle-guest-dialog-props";
import { LocalBattleGuestDialogProps } from "./props";

/** ローカル対戦ゲストのダイアログ */
export class LocalBattleGuestDialog implements DOMDialog {
  /** プロパティ */
  #props: LocalBattleGuestDialogProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createLocalBattleGuestDialogProps();
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
