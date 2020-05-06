// @flow

import type {DOMScene} from "../dom-scene";

export class MatchCard implements DOMScene {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor(): void {
    this._root = document.createElement('div');
    this._root.className = 'match-card';
    this._root.innerHTML = `
      対戦カード
    `;
  }
  
  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /**
   * シーンを表示する
   */
  show(): void {
    // NOP
  }

  /**
   * シーンを非表示にする
   */
  hidden(): void {
    // NOP
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}