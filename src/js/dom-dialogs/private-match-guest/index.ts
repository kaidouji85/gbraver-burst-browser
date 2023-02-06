import { pushDOMStream } from "../../dom/event-stream";
import { Resources } from "../../resource";
import { Unsubscriber } from "../../stream/stream";
import { DOMDialog } from "../dialog";
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
}
