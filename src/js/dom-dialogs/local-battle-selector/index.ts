import { Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createLocalBattleSelectorDialogProps,
  CreateLocalBattleSelectorPropsOptions,
} from "./procedures/create-local-battle-selector-dialog-props";
import { LocalBattleSelectorDialogProps } from "./props";

/** コンストラクタのオプション */
export type LocalBattleSelectorDialogOptions =
  CreateLocalBattleSelectorPropsOptions;

/** ローカル対戦セレクターダイアログ */
export class LocalBattleSelectorDialog implements DOMDialog {
  /** プロパティ */
  #props: LocalBattleSelectorDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   */
  constructor(options: LocalBattleSelectorDialogOptions) {
    this.#props = createLocalBattleSelectorDialogProps(options);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
