import { DOMDialog } from "../dialog";
import {
  createTutorialDescriptionProps,
  TutorialDescriptionDialogPropsOptions,
} from "./procedures/create-tutoria-description-props";
import { TutorialDescriptionDialogProps } from "./props";

/** コンストラクタのオプション */
type TutorialDescriptionDialogOptions = TutorialDescriptionDialogPropsOptions;

/** チュートリアル説明ダイアログ */
export class TutorialDescriptionDialog implements DOMDialog {
  /** プロパティ */
  readonly #props: TutorialDescriptionDialogProps;

  /**
   * @constructor
   * @param options コンストラクタのオプション
   */
  constructor(options: TutorialDescriptionDialogOptions) {
    this.#props = createTutorialDescriptionProps(options);
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
