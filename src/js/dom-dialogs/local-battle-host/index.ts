import { DOMDialog } from "../dialog";
import {
  createLocalBattleHostDialogProps,
  CreateLocalBattleHostDialogPropsOptions,
} from "./procedures/create-local-battle-host-dialog-props";
import { LocalBattleHostDialogProps } from "./props";

/** ローカル対戦ホストダイアログのオプション */
export type LocalBattleHostDialogOptions =
  CreateLocalBattleHostDialogPropsOptions;

/** ローカル対戦ホストダイアログ */
export class LocalBattleHostDialog implements DOMDialog {
  /** プロパティ */
  #props: LocalBattleHostDialogProps;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: LocalBattleHostDialogOptions) {
    this.#props = createLocalBattleHostDialogProps(options);
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
