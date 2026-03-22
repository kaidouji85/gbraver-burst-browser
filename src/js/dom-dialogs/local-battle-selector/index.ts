import { Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createLocalBattleSelectorProps,
  CreateLocalBattleSelectorPropsOptions,
} from "./procedures/create-local-battle-selector-props";
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
    this.#props = createLocalBattleSelectorProps(options);
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
