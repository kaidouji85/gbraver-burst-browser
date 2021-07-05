// @flow

import type {DOMDialog} from "../dialog";

/** ルート要素のcssクラス名 */
const ROOT_CLASS_NAME = 'network-error';

/**
 * ルート要素のinnerHTML
 *
 * @param caption ダイアログに表示する文言
 * @param nextAction ボタンに表示される文言
 * @return innerHTML
 */
function rootInnerHTML(caption: string, nextAction: string): string {
  return `
    <div class="${ROOT_CLASS_NAME}__background"></div>
    <div class="${ROOT_CLASS_NAME}__dialog">
      <span class="${ROOT_CLASS_NAME}__dialog__caption">${caption}</span>
      <button class="${ROOT_CLASS_NAME}__dialog__next-action">${nextAction}</button>
    </div>
  `;
}

/** 通信エラー ダイアログ */
export class NetworkErrorDialog implements DOMDialog {
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param caption ダイアログに表示する文言
   * @param nextAction ボタンに表示される文言
   */
  constructor(caption: string, nextAction: string) {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(caption, nextAction);
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