// @flow
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import type {DOMDialog} from '../dialog';

/** ルート要素のclass属性 */
const ROOT_CLASS = 'config-changed';

/**
 * ルート要素のinnerHTML
 *
 * @param resources リソース管理オブジェクト
 * @return innerHTML
 */
function rootInnerHTML(resources: Resources): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}"></img>
    <div class="${ROOT_CLASS}__dialog">
      <span class="${ROOT_CLASS}__dialog__caption">設定が変更されています</span>
      <div class="${ROOT_CLASS}__dialog__controllers">
        <button class="${ROOT_CLASS}__dialog__controllers__discard">設定変更を破棄</button>
        <button class="${ROOT_CLASS}__dialog__controllers__accept">この設定にする</button>
      </div>
    </div>
  `;
}

/** 設定変更通知ダイアログ */
export class ConfigChangedDialog implements DOMDialog {
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML(resources);
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