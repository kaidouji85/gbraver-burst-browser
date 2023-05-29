import { Observable, Unsubscribable } from "rxjs";

import { domImmediatePushStream } from "../../dom/push-dom";
import { Resources } from "../../resource";
import { DOMDialog } from "../dialog";
import { onCloserPush } from "./listeners/on-closer-push";
import { onEnterButtonPush } from "./listeners/on-enter-button-push";
import {
  createPrivateMatchGuestDialogProps,
  PrivateMatchGuestDialogProps,
} from "./props";

/** プライベートマッチゲストダイアログ */
export class PrivateMatchGuestDialog implements DOMDialog {
  /** プロパティ */
  #props: PrivateMatchGuestDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createPrivateMatchGuestDialogProps(resources);
    this.#unsubscribers = [
      domImmediatePushStream(this.#props.closer).subscribe((action) => {
        onCloserPush(this.#props, action);
      }),
      domImmediatePushStream(this.#props.enterButton).subscribe((action) => {
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
   * @return 通知ストリーム
   */
  notifyDialogClosed(): Observable<void> {
    return this.#props.dialogClosed;
  }

  /**
   * プライベートマッチ開始の通知
   * ユーザが入力したルームIDはストリームのデータとして渡す
   * @return 通知ストリーム
   */
  notifyPrivateMatchStart(): Observable<string> {
    return this.#props.privateMatchStart;
  }
}
