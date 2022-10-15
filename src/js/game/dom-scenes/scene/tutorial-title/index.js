// @flow
import type {DOMScene} from "../../dom-scene";
import {createTutorialTitleProps} from "./props";
import type {CreatePropsParams, TutorialTitleProps} from "./props";

/** チュートリアルタイトル画面パラメータ */
type TutorialTitleParams = CreatePropsParams;

/** チュートリアル タイトル画面 */
export class TutorialTitle implements DOMScene {
  /** プロパティ */
  #props: TutorialTitleProps;

  /**
   * コンストラクタ
   *
   * @param params パラメータ
   */
  constructor(params: TutorialTitleParams) {
    this.#props = createTutorialTitleProps(params);
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