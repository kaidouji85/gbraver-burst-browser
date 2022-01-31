// @flow

import type {DOMScene} from "../dom-scene";

/** 設定画面 */
export class ConfigScene implements DOMScene {
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