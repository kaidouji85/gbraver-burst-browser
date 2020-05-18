// @flow

import type {DOMScene} from "../dom-scene";

/**
 * NPCルート エンディング
 */
export class NPCEnding implements DOMScene {
  _root: HTMLElement;

  constructor() {
    this._root = document.createElement('div');
    this._root.className = 'npc-ending';
    this._root.innerHTML = `
      全クリおめでとう
    `;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}