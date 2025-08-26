import { DOMDialog } from "../dialog";
import { createStatusDialogProps } from "./procedures/create-status-dialog-props";
import { StatusDialogProps } from "./props";

/** ステータスダイアログ */
export class StatusDialog implements DOMDialog {
  /** プロパティ */
  readonly #props: StatusDialogProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createStatusDialogProps();
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
