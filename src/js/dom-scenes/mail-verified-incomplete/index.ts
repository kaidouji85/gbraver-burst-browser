import { Observable, Unsubscribable } from "rxjs";

import type { DOMScene } from "../dom-scene";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import { createMailVerifiedIncompleteProps } from "./procedures/create-mail-verified-incomplete-props";
import { MailVerifiedIncompleteProps } from "./props";

/** メール認証未完了画面 */
export class MailVerifiedIncomplete implements DOMScene {
  /** プロパティ */
  #props: MailVerifiedIncompleteProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param mailAddress 認証メール送信先アドレス
   */
  constructor(mailAddress: string) {
    this.#props = createMailVerifiedIncompleteProps(mailAddress);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override  */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * タイトル遷移通知
   * @returns 通知ストリーム
   */
  notifyTitleTransition(): Observable<void> {
    return this.#props.gotoTitle;
  }

  /**
   * 再読み込み通知
   * @returns 通知ストリーム
   */
  notifyReload(): Observable<void> {
    return this.#props.reload;
  }
}
