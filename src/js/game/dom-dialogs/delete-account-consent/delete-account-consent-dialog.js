// @flow

import type {DOMScene} from "../../dom-scenes/dom-scene";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";

/** ルート要素 class属性 */
const ROOT_CLASS = 'delete-account-consent';

/**
 * ルート要素のinnerHTML
 *
 * @param resources リソース管理オブジェクト
 * @return innerHTML
 */
function rootInnerHTML(resources: Resources): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)
    ?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}">
    <div class="${ROOT_CLASS}__dialog">
      <div class="${ROOT_CLASS}__dialog__caption">
        <div>アカウント削除をすると、</div>
        <div>ネット対戦が出来なくなります。</div>
        <div>本当にアカウント削除しますか？</div>
      </div>
      <div class="${ROOT_CLASS}__dialog__controllers">
        <button class="${ROOT_CLASS}__dialog__controllers__close">閉じる</button>
        <button class="${ROOT_CLASS}__dialog__controllers__delete-account">　アカウント削除</buton>
      </div>
    </div>
  `;
}

/** アカウント削除同意ダイアログ */
export class DeleteAccountConsentDialog implements DOMScene {
  _root: HTMLElement;

  /**
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML(resources);
    this._root.className = ROOT_CLASS;
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