// @flow

import type {DOMScene} from "../dom-scene";

/** ルート要素 class属性 */
const ROOT_CLASS = 'mail-verified-incomplete';

/**
 * ルート要素のinnerHTML
 *
 * @return ルート要素innerHTML
 */
function rootInnerHTML(): string {
  return `メール認証未完了`;
}

/** メール認証未完了 */
export class MailVerifiedIncomplete implements DOMScene {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor(): void {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML();
  }
  
  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override  */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}