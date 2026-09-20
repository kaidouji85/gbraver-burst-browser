import { DOMDialog } from "../dialog";
import { createPlayerPickerDialogProps } from "./procedures/create-player-selector-dialog-props";
import { PlayerPickerDialogProps } from "./props";

/** プレイヤーピッカーダイアログ */
export class PlayerPickerDialog implements DOMDialog {
  /** プロパティ */
  #props: PlayerPickerDialogProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createPlayerPickerDialogProps();
  }

  /** @override */
  destructor(): void {
    // デストラクタ相当の処理をここに記述
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
