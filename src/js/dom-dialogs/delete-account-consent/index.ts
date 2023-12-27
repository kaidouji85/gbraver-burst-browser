import { Observable, Unsubscribable } from "rxjs";

import { Resources } from "../../resource";
import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { createProps } from "./procedure/create-props";
import { DeleteAccountConsentDialogProps } from "./props";

/** アカウント削除同意ダイアログ */
export class DeleteAccountConsentDialog implements DOMDialog {
  /** プロパティ */
  #props: DeleteAccountConsentDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createProps(resources);
    this.#unsubscribers = bindEventListeners(this.#props);
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
   * アカウント削除通知
   * @return 通知ストリーム
   */
  notifyAccountDeletion(): Observable<void> {
    return this.#props.deleteAccount;
  }

  /**
   * ダイアログを閉じる通知
   * @return 通知ストリーム
   */
  notifyClosed(): Observable<void> {
    return this.#props.closeDialog;
  }
}
