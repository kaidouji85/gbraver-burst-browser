import { DOMDialog } from "../dialog";
import {
  createPrivateMatchGuestDialogProps,
  PrivateMatchGuestDialogProps,
} from "./props";

/** プライベートマッチゲストダイアログ */
export class PrivateMatchGuestDialog implements DOMDialog {
  #props: PrivateMatchGuestDialogProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createPrivateMatchGuestDialogProps();
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
