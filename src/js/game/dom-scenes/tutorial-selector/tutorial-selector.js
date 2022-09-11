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
    <ol class="${ROOT_CLASS}__stages">
      <li class="${ROOT_CLASS}__stage">
        <span class="${ROOT_CLASS}__stage-title">バッテリーシステム基本</span>
        <button class="${ROOT_CLASS}__stage-select">選択</button>
      </li>
      <li class="${ROOT_CLASS}__stage">
        <span class="${ROOT_CLASS}__stage-title">0防御は即死</span>
        <button class="${ROOT_CLASS}__stage-select">選択</button>
      </li>
      <li class="${ROOT_CLASS}__stage">
        <span class="${ROOT_CLASS}__stage-title">バースト基礎</span>
        <button class="${ROOT_CLASS}__stage-select">選択</button>
      </li>
    </ol>
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