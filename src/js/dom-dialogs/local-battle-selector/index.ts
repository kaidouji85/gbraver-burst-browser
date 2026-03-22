import { DOMDialog } from "../dialog";
import {
  createLocalBattleSelectorProps,
  CreateLocalBattleSelectorPropsOptions,
} from "./procedures/create-local-battle-selector-props";
import { LocalBattleSelectorProps } from "./props";

/** コンストラクタのオプション */
export type LocalBattleSelectorDialogOptions =
  CreateLocalBattleSelectorPropsOptions;

/** ローカル対戦セレクターダイアログ */
export class LocalBattleSelectorDialog implements DOMDialog {
  /** プロパティ */
  #props: LocalBattleSelectorProps;

  /**
   * コンストラクタ
   */
  constructor(options: LocalBattleSelectorDialogOptions) {
    this.#props = createLocalBattleSelectorProps(options);
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
