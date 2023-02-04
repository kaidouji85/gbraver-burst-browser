import { pushDOMStream } from "../../dom/event-stream";
import { Resources } from "../../resource";
import { Unsubscriber } from "../../stream/stream";
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
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param roomID ルームID
   */
  constructor(resources: Resources, roomID: string) {
    this.#props = createPrivateMatchHostDialogProps(resources, roomID);
    this.#unsubscribers = [
      pushDOMStream(this.#props.closer).subscribe((action) => {
        onCloserPush(this.#props, action);
      }),
    ];
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((v) => v.unsubscribe());
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
