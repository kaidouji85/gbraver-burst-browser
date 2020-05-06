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
      <div class="match-card__contents">
        <div class="match-card__contents__cards">
          <img class="match-card__contents__cards__enemy" src="${resourcePath.get()}/armdozer/neo-landozer/player-select.png">
          <div class="match-card__contents__cards__vs">vs</div>
          <img class="match-card__contents__cards__player" src="${resourcePath.get()}/armdozer/shin-braver/player-select.png">
        </div>
      </div>
    `;
  }

  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}