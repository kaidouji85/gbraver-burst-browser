import { DOMDialog } from "../dialog";
import {
  createPrivateMatchHostDialogProps,
  PrivateMatchHostDialogProps,
} from "./props";
import {Resources} from "../../resource";

/** プライベートマッチホストダイアログ */
export class PrivateMatchHostDialog implements DOMDialog {
  /** プロパティ */
  #props: PrivateMatchHostDialogProps;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createPrivateMatchHostDialogProps(resources);
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
