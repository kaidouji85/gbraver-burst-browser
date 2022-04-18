// @flow
import type {DOMDialog} from "../dialog";

/** ルート要素のcssクラス名 */
const ROOT_CLASS = 'matching';

/**
 * ルート要素のinnerHTML
 *
 * @return innerHTML
 */
function rootInnerHTML(): string {
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <span>マッチング中......</span>    
    </div>
  `;
}

/** マッチング ダイアログ */
export class MatchingDialog implements DOMDialog {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML();
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /**
   * ルートのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}