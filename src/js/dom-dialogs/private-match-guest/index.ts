import { Observable, Unsubscribable } from "rxjs";

import { domPushStream } from "../../dom/push-dom";
import { DOMDialog } from "../dialog";
import { onCloserPush } from "./listeners/on-closer-push";
import { onEnterButtonPush } from "./listeners/on-enter-button-push";
import {
  createPrivateMatchGuestDialogProps,
  PrivateMatchGuestDialogProps,
  PropsCreatorParams,
} from "./props";
import {replaceDOM} from "../../dom/replace-dom";

/** コンストラクタのパラメータ */
export type PrivateMatchGuestDialogParams = PropsCreatorParams;

/** プライベートマッチゲストダイアログ */
export class PrivateMatchGuestDialog implements DOMDialog {
  /** プロパティ */
  #props: PrivateMatchGuestDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PrivateMatchGuestDialogParams) {
    this.#props = createPrivateMatchGuestDialogProps(params);
    this.#unsubscribers = [
      domPushStream(this.#props.closer).subscribe((action) => {
        onCloserPush(this.#props, action);
      }),
      domPushStream(this.#props.enterButton).subscribe((action) => {
        onEnterButtonPush(this.#props, action);
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
