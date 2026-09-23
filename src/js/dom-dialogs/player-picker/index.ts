import { Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createPlayerPickerDialogProps,
  CreatePlayerPickerDialogPropsOptions,
} from "./procedures/create-player-selector-dialog-props";
import { PlayerPickerDialogProps } from "./props";

/** コンストラクタのオプション */
type PlayerPickerDialogOptions = CreatePlayerPickerDialogPropsOptions;

/** プレイヤーピッカーダイアログ */
export class PlayerPickerDialog implements DOMDialog {
  /** プロパティ */
  readonly #props: PlayerPickerDialogProps;
  /** アンサブスクライバブル */
  readonly #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: PlayerPickerDialogOptions) {
    this.#props = createPlayerPickerDialogProps(options);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((unsubscriber) => unsubscriber.unsubscribe());
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
