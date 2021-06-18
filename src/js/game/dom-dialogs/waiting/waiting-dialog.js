// @flow

import type {DOMDialog} from "../dialog";

/** ルート要素のcssクラス名 */
const ROOT_CLASS_NAME = 'waiting';

/**
 * ルート要素のinnerHTML
 *
 * @param caption ダイアログに表示する文言
 * @return innerHTML
 */
function rootInnerHTML(caption: string): string {
  return `
    <div class="${ROOT_CLASS_NAME}__background"></div>
    <div class="${ROOT_CLASS_NAME}__dialog">
      <span>${caption}</span>    
    </div>
  `;
}

/** 作業待ち ダイアログ */
export class WaitingDialog implements DOMDialog {
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param caption ダイアログに表示する文言
   */
  constructor(caption: string) {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(caption);
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