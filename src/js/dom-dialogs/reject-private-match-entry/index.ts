import { Observable, Unsubscribable } from "rxjs";

import { domImmediatePushStream } from "../../dom/push-dom";
import { Resources } from "../../resource";
import { DOMDialog } from "../dialog";
import { onBackgroundPush } from "./listeners/on-background-push";
import { onCloseButtonPush } from "./listeners/on-close-button-push";
import { onCloserPush } from "./listeners/on-closer-push";
import {
  createRejectPrivateMatchEntryDialogProps,
  RejectPrivateMatchEntryDialogProps,
} from "./props";

/** プライベートマッチエントリ拒否ダイアログ */
export class RejectPrivateMatchEntryDialog implements DOMDialog {
  /** プロパティ */
  #props: RejectPrivateMatchEntryDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createRejectPrivateMatchEntryDialogProps(resources);
    this.#unsubscribers = [
      domImmediatePushStream(this.#props.closeButton).subscribe((action) => {
        onCloseButtonPush(this.#props, action);
      }),
      domImmediatePushStream(this.#props.closer).subscribe((action) => {
        onCloserPush(this.#props, action);
      }),
      domImmediatePushStream(this.#props.background).subscribe((action) => {
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
