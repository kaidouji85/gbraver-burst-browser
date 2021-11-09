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
      <span class="${ROOT_CLASS}__dialog__caption">
        アカウント削除をするとネット対戦が出来なくなります。
        本当にアカウント削除しますか？
      </span>
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