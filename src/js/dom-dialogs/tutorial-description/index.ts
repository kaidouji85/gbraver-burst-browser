import { DOMDialog } from "../dialog";
import { createTutorialDescriptionProps } from "./procedures/create-tutoria-description-props";
import { TutorialDescriptionDialogProps } from "./props";

/** チュートリアル説明ダイアログ */
export class TutorialDescriptionDialog implements DOMDialog {
  /** プロパティ */
  readonly #props: TutorialDescriptionDialogProps;

  constructor() {
    this.#props = createTutorialDescriptionProps();
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
