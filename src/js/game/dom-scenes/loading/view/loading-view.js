// @flow

import type {LoadingState} from "../state/loading-state";
import {domUuid} from "../../../../uuid/dom-uuid";


/** ローディングシーンのビュー */
export class LoadingView {
  _root: HTMLElement;
  _text: HTMLElement;
  _bar: HTMLElement;

  constructor(initialState: LoadingState) {
    const textId = domUuid();
    const barId = domUuid();

    this._root = document.createElement('div');
    this._root.innerHTML = `
      <div class="loading__completed-rate">
        <div class="loading__completed-rate__text" data-id="${textId}"></div>
        <div class="loading__completed-rate__bar">
          <div class="loading__completed-rate__bar__completed" data-id="${barId}"></div>
        </div>
      </div>
    `;

    this._text = this._root.querySelector(`[data-id="${textId}"]`) || document.createElement('div');
    this._bar = this._root.querySelector(`[data-id="${barId}"]`) || document.createElement('div');

    this.engage(initialState);
  }

  /**
   * 状態をビューに反映させる
   *
   * @param state 状態
   */
  engage(state: LoadingState): void {
    this._root.className = 'loading';
    this._root.style.display = state.isVisible
      ? 'flex'
      : 'none';
    this._text.innerText = `LOADING... ${Math.floor(state.completedRate * 100)}%`;
    this._bar.style.width = `${state.completedRate * 100}%`
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