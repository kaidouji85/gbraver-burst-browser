import { Resources } from "../../resource";
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
   * @param resources リソース管理オブジェクト
   * @param roomID ルームID
   */
  constructor(resources: Resources, roomID: string) {
    this.#props = createPrivateMatchHostDialogProps(resources, roomID);
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
