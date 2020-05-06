// @flow

import type {ResourcePath} from "../../../../resource/path/resource-path";

/**
 * 対戦カードシーン ビュー
 */
export class MatchCardView {
  _root: HTMLElement;
  
  constructor(resourcePath: ResourcePath) {
    this._root = document.createElement('div');
    this._root.className = 'match-card';
    this._root.innerHTML = `
      対戦カード
    `;
  }

  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}