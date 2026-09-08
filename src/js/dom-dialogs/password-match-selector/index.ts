import { Observable, Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createPasswordMatchSelectorDialogProps,
  CreatePasswordMatchSelectorPropsOptions,
} from "./procedures/create-password-match-selector-dialog-props";
import { PasswordMatchSelectorDialogProps } from "./props";

/** コンストラクタのオプション */
export type PasswordMatchSelectorDialogOptions =
  CreatePasswordMatchSelectorPropsOptions;

/** あいことば対戦セレクターダイアログ */
export class PasswordMatchSelectorDialog implements DOMDialog {
  /** プロパティ */
  #props: PasswordMatchSelectorDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options コンストラクタのオプション
   */
  constructor(options: PasswordMatchSelectorDialogOptions) {
    this.#props = createPasswordMatchSelectorDialogProps(options);
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

  /**
   * あいことば対戦ホスト選択が選択されたことを通知する
   * @returns 通知ストリーム
   */
  notifyHostSelection(): Observable<void> {
    return this.#props.hostSelection;
  }

  /**
   * あいことば対戦ゲスト選択が選択されたことを通知する
   * @returns 通知ストリーム
   */
  notifyGuestSelection(): Observable<void> {
    return this.#props.guestSelection;
  }

  /**
   * ダイアログが閉じられたことを通知する
   * @returns 通知ストリーム
   */
  notifyClosed(): Observable<void> {
    return this.#props.dialogClosed;
  }
}
