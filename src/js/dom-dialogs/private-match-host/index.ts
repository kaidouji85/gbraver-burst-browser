import { Observable, Unsubscribable } from "rxjs";

import { domPushStream } from "../../dom/push-dom";
import { DOMDialog } from "../dialog";
import { onCloserPush } from "./listeners/on-closer-push";
import {
  createPrivateMatchHostDialogProps,
  PrivateMatchHostDialogProps,
  PropsCreatorParams,
} from "./props";

/** コンストラクタのパラメータ */
export type PrivateMatchHostDialogParams =
  PropsCreatorParams;

/** プライベートマッチホストダイアログ */
export class PrivateMatchHostDialog implements DOMDialog {
  /** プロパティ */
  #props: PrivateMatchHostDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

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
   * @return 通知ストリーム
   */
  notifyDialogClosed(): Observable<void> {
    return this.#props.dialogClosed;
  }
}
