// @flow

import type {HowToPlayState} from "../state/how-to-play-state";
import {domUuid} from "../../../../uuid/dom-uuid";

/** 遊び方シーンのビュー */
export class HowToPlayView {
  _root: HTMLElement;

  constructor(dom: HTMLElement) {
    const rootId = domUuid();
    dom.innerHTML = `
      <div class="how-to-play" id="${rootId}">
        遊び方(準備中)
      </div>
    `;

    this._root = document.getElementById(rootId) || document.createElement('div');
  }

  /**
   * ステートをビューに反映する
   *
   * @param state ステート
   */
  engage(state: HowToPlayState): void {
    this._root.className = state.isVisible
      ? 'how-to-play'
      : 'how-to-play--invisible';
  }
}