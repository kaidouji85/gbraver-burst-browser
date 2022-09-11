// @flow
import type {DOMScene} from "../dom-scene";

/** ROOT要素class属性*/
const ROOT_CLASS = 'tutorial-selector';

/** チュートリアルステージセレクト */
export class TutorialSelector implements DOMScene {
  root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this.root = document.createElement('div');
    this.root.className = ROOT_CLASS;
    this.root.innerText = 'tutorial selector';
  }


  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.root;
  }
}