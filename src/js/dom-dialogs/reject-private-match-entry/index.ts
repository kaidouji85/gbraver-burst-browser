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
   */
  constructor() {
    this.#props = createRejectPrivateMatchEntryDialogProps();
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
