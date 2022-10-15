// @flow
import type {Resources} from "../../../../resource";
import type {DOMScene} from "../../dom-scene";
import {createTutorialTitleProps} from "./props";
import type {TutorialTitleProps} from "./props";

/** チュートリアルタイトル画面 */
export class TutorialTitle implements DOMScene {
  /** プロパティ */
  #props: TutorialTitleProps;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createTutorialTitleProps(resources);
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