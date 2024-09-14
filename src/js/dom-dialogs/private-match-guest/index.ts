import { Observable, Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEvenListeners } from "./procedure/bind-even-listeners";
import {
  createPrivateMatchGuestDialogProps,
  PropsCreatorParams,
} from "./procedure/create-private-match-guest-dialog-props";
import { PrivateMatchGuestDialogProps } from "./props";

/** コンストラクタのパラメータ */
export type PrivateMatchGuestDialogParams = PropsCreatorParams;

/** プライベートマッチゲストダイアログ */
export class PrivateMatchGuestDialog implements DOMDialog {
  /** プロパティ */
  readonly #props: PrivateMatchGuestDialogProps;
  /** アンサブスクライバ */
  readonly #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PrivateMatchGuestDialogParams) {
    this.#props = createPrivateMatchGuestDialogProps(params);
    this.#unsubscribers = bindEvenListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
    this.#props.qrCodeReader.stop();
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

  /**
   * プライベートマッチ開始の通知
   * ユーザが入力したルームIDはストリームのデータとして渡す
   * @returns 通知ストリーム
   */
  notifyPrivateMatchStart(): Observable<string> {
    return this.#props.privateMatchStart;
  }
}
