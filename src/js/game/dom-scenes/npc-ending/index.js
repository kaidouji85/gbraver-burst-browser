// @flow

import type {DOMScene} from "../dom-scene";
import type {ResourcePath} from "../../../resource/path/resource-path";

/**
 * NPCルート エンディング
 */
export class NPCEnding implements DOMScene {
  _root: HTMLElement;

  constructor(resourcePath: ResourcePath) {
    this._root = document.createElement('div');
    this._root.className = 'npc-ending';
    this._root.innerHTML = `
      STAGE ALL CLEAR!!
    `;
    this._root.style.backgroundImage = `url(${resourcePath.get()}/ending/end-card.png)`;
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