// @flow
import type {DOMDialog} from '../dialog';

/** ルート要素 class属性 */
const ROOT_CLASS = 'degree-of-difficulty';

/** 難易度選択ダイアログ */
export class DegreeOfDifficultyDialog implements DOMDialog {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerText = '難易度選択';
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}