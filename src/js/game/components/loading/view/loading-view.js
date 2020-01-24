// @flow

import type {LoadingState} from "../state/loading-state";
import {domUuid} from "../../../../uuid/dom-uuid";

/** コンストラクタのパラメータ */
type Param = {
  dom: HTMLElement,
  initialState: LoadingState
};

/** ローディングシーンのビュー */
export class LoadingView {
  _root: HTMLElement;
  _text: HTMLElement;
  _bar: HTMLElement;

  constructor(param: Param) {
    const rootId = domUuid();
    const textId = domUuid();
    const barId = domUuid();

    param.dom.innerHTML = `
      <div class="loading" id="${rootId}" >
      <div class="loading__completed-rate">
        <div class="loading__completed-rate__text" id="${textId}"></div>
        <div class="loading__completed-rate__bar">
          <div class="loading__completed-rate__bar__completed" id="${barId}"></div>
        </div>
      </div>
    </div>
    `;

    this._root = document.getElementById(rootId) || document.createElement('div');
    this._text = document.getElementById(textId) || document.createElement('div');
    this._bar = document.getElementById(barId) || document.createElement('div');

    this.engage(param.initialState);
  }

  /**
   * 状態をビューに反映させる
   *
   * @param state 状態
   */
  engage(state: LoadingState): void {
    this._root.style.display = state.isVisible
      ? 'flex'
      : 'none';
    this._text.innerText = `LOADING... ${Math.floor(state.completedRate * 100)}%`;
    this._bar.style.width = `${state.completedRate * 100}%`
  }
}