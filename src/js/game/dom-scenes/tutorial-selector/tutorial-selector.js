// @flow
import type {DOMScene} from "../dom-scene";

/** ROOT要素class属性*/
const ROOT_CLASS = 'tutorial-selector';

/**
 * ルート要素のinnerHTML
 * @return innerHTML
 */
export function rootInnerHTML(): string {
  return `
    <div class="${ROOT_CLASS}__title">チュートリアル</div>
    <div class="${ROOT_CLASS}__stages">
      <button class="${ROOT_CLASS}__stage-button">1</button>
      <button class="${ROOT_CLASS}__stage-button">2</button>
      <button class="${ROOT_CLASS}__stage-button">3</button>
    </div>
    <button class="${ROOT_CLASS}__prev">戻る</button>
  `;
}

/** チュートリアルステージセレクト画面 */
export class TutorialSelector implements DOMScene {
  root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this.root = document.createElement('div');
    this.root.className = ROOT_CLASS;
    this.root.innerHTML = rootInnerHTML();
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