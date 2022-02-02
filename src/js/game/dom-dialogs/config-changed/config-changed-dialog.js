// @flow
import type {DOMDialog} from '../dialog';

/** 設定変更通知ダイアログ */
export class ConfigChangedDialog implements DOMDialog {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.innerText = 'hello';
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