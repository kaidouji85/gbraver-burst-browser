import { DOMDialog } from "../dialog";
import {
  createPrivateMatchHostDialogProps,
  PrivateMatchHostDialogProps,
} from "./props";

/** プライベートマッチホストダイアログ */
export class PrivateMatchHostDialog implements DOMDialog {
  /** プロパティ */
  #props: PrivateMatchHostDialogProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createPrivateMatchHostDialogProps();
  }

  /** @override */
  destructor(): void {
    // NOP
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
