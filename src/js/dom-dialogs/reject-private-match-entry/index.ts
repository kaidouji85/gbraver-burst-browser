import { pushDOMStream } from "../../dom/event-stream";
import { Resources } from "../../resource";
import { Stream, Unsubscriber } from "../../stream/stream";
import { DOMDialog } from "../dialog";
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
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createRejectPrivateMatchEntryDialogProps(resources);
    this.#unsubscribers = [
      pushDOMStream(this.#props.closeButton).subscribe((action) => {
        onCloseButtonPush(this.#props, action);
      }),
      pushDOMStream(this.#props.closer).subscribe(action => {
        onCloserPush(this.#props, action);
      })
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
  notifyDialogClosed(): Stream<void> {
    return this.#props.dialogClosed;
  }
}
