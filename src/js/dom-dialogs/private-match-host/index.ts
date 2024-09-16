import { Observable, Unsubscribable } from "rxjs";

import { domPushStream } from "../../dom/push-dom";
import { DOMDialog } from "../dialog";
import { onCloserPush } from "./procedures/on-closer-push";
import { onCopyRoomIdPush } from "./procedures/on-copy-room-id-push";
import {
  PrivateMatchHostDialogProps,
  PropsCreatorParams,
} from "./props";
import {createPrivateMatchHostDialogProps} from "./procedures/create-private-match-host-dialog-props";

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
    this.#unsubscribers = [
      domPushStream(this.#props.closer).subscribe((action) => {
        onCloserPush(this.#props, action);
      }),
      domPushStream(this.#props.copyRoomID).subscribe(() => {
        onCopyRoomIdPush(this.#props);
      }),
    ];
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
