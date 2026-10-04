import { Observable, Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import { createPrivateMatchHostDialogProps } from "./procedures/create-private-match-host-dialog-props";
import { PrivateMatchHostDialogProps, PropsCreatorParams } from "./props";

/** コンストラクタのパラメータ */
export type PrivateMatchHostDialogParams = PropsCreatorParams;

/** プライベートマッチホストダイアログ */
export class PrivateMatchHostDialog implements DOMDialog {
  /** プロパティ */
  readonly #props: PrivateMatchHostDialogProps;
  /** アンサブスクライバ */
  readonly #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PrivateMatchHostDialogParams) {
    this.#props = createPrivateMatchHostDialogProps(params);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((v) => v.unsubscribe());
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * ダイアログ閉じる通知
   * @returns 通知ストリーム
   */
  notifyDialogClosed(): Observable<void> {
    return this.#props.dialogClosed;
  }
}
