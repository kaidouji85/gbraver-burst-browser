import { Observable, Unsubscribable } from "rxjs";

import { domPushStream } from "../../dom/push-dom";
import { DOMDialog } from "../dialog";
import { onBackgroundPush } from "./listeners/on-background-push";
import { onCloseButtonPush } from "./listeners/on-close-button-push";
import { onCloserPush } from "./listeners/on-closer-push";
import {
  createRejectPrivateMatchEntryDialogProps,
  PropsCreatorParams,
  RejectPrivateMatchEntryDialogProps,
} from "./props";

/** コンストラクタのパラメータ */
export type RejectPrivateMatchEntryDialogParams = PropsCreatorParams;

/** プライベートマッチエントリ拒否ダイアログ */
export class RejectPrivateMatchEntryDialog implements DOMDialog {
  /** プロパティ */
  #props: RejectPrivateMatchEntryDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: RejectPrivateMatchEntryDialogParams) {
    this.#props = createRejectPrivateMatchEntryDialogProps(params);
    this.#unsubscribers = [
      domPushStream(this.#props.closeButton).subscribe((action) => {
        onCloseButtonPush(this.#props, action);
      }),
      domPushStream(this.#props.closer).subscribe((action) => {
        onCloserPush(this.#props, action);
      }),
      domPushStream(this.#props.background).subscribe((action) => {
        onBackgroundPush(this.#props, action);
      }),
    ];
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
   * ダイアログ閉じる通知
   * @return 通知ストリーム
   */
  notifyDialogClosed(): Observable<void> {
    return this.#props.dialogClosed;
  }
}
