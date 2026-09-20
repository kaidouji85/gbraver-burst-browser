import { DOMDialog } from "../dialog";
import {
  createPlayerPickerDialogProps,
  CreatePlayerPickerDialogPropsOptions,
} from "./procedures/create-player-selector-dialog-props";
import { PlayerPickerDialogProps } from "./props";

/** コンストラクタのオプション */
type PlayerPickerDialogOptions = CreatePlayerPickerDialogPropsOptions;

/** プレイヤーピッカーダイアログ */
export class PlayerPickerDialog implements DOMDialog {
  /** プロパティ */
  #props: PlayerPickerDialogProps;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: PlayerPickerDialogOptions) {
    this.#props = createPlayerPickerDialogProps(options);
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
