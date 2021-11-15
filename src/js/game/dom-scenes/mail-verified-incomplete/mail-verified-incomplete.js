// @flow

import type {DOMScene} from "../dom-scene";
import {escapeHTML} from "../../../dom/escape/escape-html";

/** ルート要素 class属性 */
const ROOT_CLASS = 'mail-verified-incomplete';

/**
 * ルート要素のinnerHTML
 *
 * @param mailAddress メールアドレス
 * @return ルート要素innerHTML
 */
function rootInnerHTML(mailAddress: string): string {
  const escapedMailAddress = escapeHTML(mailAddress);
  return `
    <div class="${ROOT_CLASS}__content">
      <div class="${ROOT_CLASS}__content__caption">${escapedMailAddress}に認証用メールを送信しました。</div>
      <div class="${ROOT_CLASS}__content__caption">同メールに記載されている認証用リンクをクリックして、サインアップを完了させてください。</div>
    </div>
  `;
}

/** メール認証未完了画面 */
export class MailVerifiedIncomplete implements DOMScene {
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param mailAddress 認証メール送信先アドレス
   */
  constructor(mailAddress: string): void {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML(mailAddress);
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