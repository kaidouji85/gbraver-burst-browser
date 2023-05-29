import { Observable, Unsubscribable } from "rxjs";

import { domImmediatePushStream } from "../../dom/push-dom";
import { Resources } from "../../resource";
import { DOMDialog } from "../dialog";
import { onCloserPush } from "./listeners/on-closer-push";
import {
  createPrivateMatchHostDialogProps,
  PrivateMatchHostDialogProps,
} from "./props";

/** プライベートマッチホストダイアログ */
export class PrivateMatchHostDialog implements DOMDialog {
  /** プロパティ */
  #props: PrivateMatchHostDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param roomID ルームID
   */
  constructor(resources: Resources, roomID: string) {
    this.#props = createPrivateMatchHostDialogProps(resources, roomID);
    this.#unsubscribers = [
      domImmediatePushStream(this.#props.closer).subscribe((action) => {
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
