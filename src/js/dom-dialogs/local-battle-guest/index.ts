import { DOMDialog } from "../dialog";
import {
  createLocalBattleGuestDialogProps,
  CreateLocalBattleGuestDialogPropsOptions,
} from "./procedure/create-local-battle-guest-dialog-props";
import { LocalBattleGuestDialogProps } from "./props";

/** ローカル対戦ゲストのダイアログのオプション */
export type LocalBattleGuestDialogOptions =
  CreateLocalBattleGuestDialogPropsOptions;

/** ローカル対戦ゲストのダイアログ */
export class LocalBattleGuestDialog implements DOMDialog {
  /** プロパティ */
  #props: LocalBattleGuestDialogProps;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: LocalBattleGuestDialogOptions) {
    this.#props = createLocalBattleGuestDialogProps(options);
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
