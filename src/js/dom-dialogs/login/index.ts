import { Observable, Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createProps,
  PropsCreatorParams,
} from "./procedures/create-props";
import { LoginDialogProps } from "./props";

/** コンストラクタのパラメータ */
export type LoginDialogParams = PropsCreatorParams;

/** ログイン ダイアログ */
export class LoginDialog implements DOMDialog {
  /** プロパティ */
  #props: LoginDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: LoginDialogParams) {
    this.#props = createProps(params);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * ダイアログ閉じる通知
   * @return 通知ストリーム
   */
  notifyClosed(): Observable<void> {
    return this.#props.closeDialog;
  }

  /**
   * ログイン実行通知
   * @return 通知ストリーム
   */
  notifyLogin(): Observable<void> {
    return this.#props.login;
  }
}
