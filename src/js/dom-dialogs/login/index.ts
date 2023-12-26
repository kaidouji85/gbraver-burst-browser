import { Observable, Unsubscribable } from "rxjs";

import { Resources } from "../../resource";
import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import { createProps } from "./procedures/create-props";
import { LoginDialogProps } from "./props";

/** ログイン ダイアログ */
export class LoginDialog implements DOMDialog {
  /** プロパティ */
  #props: LoginDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param caption 入力フォームに表示されるメッセージ
   */
  constructor(resources: Resources, caption: string) {
    this.#props = createProps(resources, caption);
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
