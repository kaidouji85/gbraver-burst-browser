import { DOMDialog } from "../dialog";
import {
  createStatusDialogProps,
  StatusDialogPropsCreatorOptions,
} from "./procedures/create-status-dialog-props";
import { StatusDialogProps } from "./props";

/** コンストラクタのオプション */
export type StatusDialogOptions = StatusDialogPropsCreatorOptions;

/** ステータスダイアログ */
export class StatusDialog implements DOMDialog {
  /** プロパティ */
  readonly #props: StatusDialogProps;

  /**
   * コンストラクタ
   */
  constructor(options: StatusDialogOptions) {
    this.#props = createStatusDialogProps(options);
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
