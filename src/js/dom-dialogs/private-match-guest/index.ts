import { pushDOMStream } from "../../dom/event-stream";
import { Resources } from "../../resource";
import { Stream, Unsubscriber } from "../../stream/stream";
import { DOMDialog } from "../dialog";
import { onBackgroundPush } from "./listeners/on-background-push";
import { onCloserPush } from "./listeners/on-closer-push";
import {
  createPrivateMatchGuestDialogProps,
  PrivateMatchGuestDialogProps,
} from "./props";

/** プライベートマッチゲストダイアログ */
export class PrivateMatchGuestDialog implements DOMDialog {
  /** プロパティ */
  #props: PrivateMatchGuestDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createPrivateMatchGuestDialogProps(resources);
    this.#unsubscribers = [
      pushDOMStream(this.#props.closer).subscribe((action) => {
        onCloserPush(this.#props, action);
      }),
      pushDOMStream(this.#props.background).subscribe((action) => {
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
  notifyDialogClosed(): Stream<void> {
    return this.#props.dialogClosed;
  }

  /**
   * プライベートマッチ開始の通知
   * ユーザが入力したルームIDはストリームのデータとして渡す
   * @return 通知ストリーム
   */
  notifyPrivateMatchStart(): Stream<string> {
    return this.#props.privateMatchStart;
  }
}
