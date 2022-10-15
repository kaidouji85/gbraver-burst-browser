// @flow
import type {DOMScene} from "../../dom-scene";
import {createTutorialTitleProps} from "./props";
import type {TutorialTitleProps} from "./props";

/** チュートリアルタイトル画面 */
export class TutorialTitle implements DOMScene {
  /** プロパティ */
  #props: TutorialTitleProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createTutorialTitleProps();
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