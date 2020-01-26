// @flow

import type {TitleState} from "../state/title-state";
import {resourceBasePath} from "../../../../resource/resource-base-path";
import {domUuid} from "../../../../uuid/dom-uuid";

/** コンストラクタのパラメータ */
type Params = {
  /** バインド先のHTML要素 */
  dom: HTMLElement,
  /** 初期状態 */
  initialState: TitleState,
  /** 画面タッチ時のイベント */
  onTouch: () => void,
};

/** タイトルビュー */
export class TitleView {
  _root: HTMLElement;

  constructor(params: Params) {
    const rootId = domUuid();
    params.dom.innerHTML = `
      <div class="title" id="${rootId}">
        <img src="${resourceBasePath()}/logo.png"/>
        <p class="title_touch-start">TOUCH START</p>
      </div>
    `;

    this._root = document.getElementById(rootId) || document.createElement('div');
    this._root.addEventListener('click', () => {
      params.onTouch();
    });
    this._root.addEventListener('touchstart', () => {
      params.onTouch();
    });

    this.engage(params.initialState);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param state ステート
   */
  engage(state: TitleState): void {
    this._root.className = state.isVisible
      ? 'title'
      : 'title--invisible';
  }
}