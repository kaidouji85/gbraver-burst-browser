import { Observable, Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { PlayerSelection } from "./player-selection";
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
  /** アンサブスクライブ */
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

  /**
   * 「タイトルへ」ボタンが押されたことを通知する
   * @returns 通知ストリーム
   */
  notifyGotoTitle(): Observable<void> {
    return this.#props.gotoTitleSubject;
  }

  /**
   * 「リトライ」ボタンが押されたことを通知する
   * @returns 通知ストリーム
   */
  notifyRetry(): Observable<PlayerSelection> {
    return this.#props.retrySubject;
  }
}
