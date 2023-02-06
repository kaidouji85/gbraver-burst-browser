import { Resources } from "../../resource";
import { DOMDialog } from "../dialog";
import {
  createRejectPrivateMatchEntryDialogProps,
  RejectPrivateMatchEntryDialogProps,
} from "./props";

/** プライベートマッチエントリ拒否ダイアログ */
export class RejectPrivateMatchEntryDialog implements DOMDialog {
  /** プロパティ */
  #props: RejectPrivateMatchEntryDialogProps;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createRejectPrivateMatchEntryDialogProps(resources);
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
