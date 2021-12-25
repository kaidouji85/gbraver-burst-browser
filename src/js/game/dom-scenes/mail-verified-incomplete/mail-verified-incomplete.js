// @flow

import type {DOMScene} from "../dom-scene";
import {escapeHTML} from "../../../dom/escape/escape-html";
import type {StreamSource} from "../../../stream/core";

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
    <div class="${ROOT_CLASS}__title">メール認証を完了させてください</div>
    <div class="${ROOT_CLASS}__caption">以下手順でメール認証を完了させてから、ゲームを開始してください</div>
    <ol class="${ROOT_CLASS}__procedure">
      <li class="${ROOT_CLASS}__procedure__item">${escapedMailAddress}に送信された認証メールを開く</li>
      <li class="${ROOT_CLASS}__procedure__item">認証メールに記載されたVerify Linkを開く</li>
      <li class="${ROOT_CLASS}__procedure__item">Gブレイバーバーストを再読み込みする</li>
    </ol>
    <div class="${ROOT_CLASS}__controllers">
      <button class="${ROOT_CLASS}__controllers__goto-title">タイトルへ</button>
      <button class="${ROOT_CLASS}__controllers__reload">再読み込み</button>
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