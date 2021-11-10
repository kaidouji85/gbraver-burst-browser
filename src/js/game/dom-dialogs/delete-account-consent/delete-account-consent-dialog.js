// @flow

import type {DOMScene} from "../../dom-scenes/dom-scene";

/** ルート要素 class属性 */
const ROOT_CLASS = 'delete-account-consent';

/**
 * ルート要素のinnerHTML
 *
 * @return innerHTML
 */
function rootInnerHTML(): string {
  return `
    <div class="${ROOT_CLASS}__background"></div>
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
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML();
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