import { DOMDialog } from "../dialog";
import { createPlayerSelectorDialogProps } from "./procedures/create-player-selector-dialog-props";
import { PlayerSelectorDialogProps } from "./props";

/** プレイヤー選択ダイアログ */
export class PlayerSelectorDialog implements DOMDialog {
  /** プロパティ */
  #props: PlayerSelectorDialogProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createPlayerSelectorDialogProps();
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
