// @flow

import type {HowToPlayState} from "../state/how-to-play-state";
import {domUuid} from "../../../../uuid/dom-uuid";

/** パラメータ */
export type Param = {
  dom: HTMLElement,
  movieURL: string
};

/**
 * 遊び方シーンのビュー
 */
export class HowToPlayView {
  _root: HTMLElement;

  constructor(param: Param) {
    const rootId = domUuid();
    param.dom.innerHTML = `
      <div class="how-to-play" id="${rootId}">
        <div class="how-to-play__title">遊び方</div>
        <div class="how-to-play__movie-container">
          <iframe class="how-to-play__movie-container__movie" width="560" height="315" src="${param.movieURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <button class="how-to-play__prev">戻る</button>
      </div>
    `;

    this._root = document.getElementById(rootId) || document.createElement('div');
  }

  /**
   * 状態をビューに反映させる
   *
   * @param state 状態
   */
  engage(state: HowToPlayState): void {
    this._root.className = state.isVisible
      ? 'how-to-play'
      : 'how-to-play--invisible';
  }
}