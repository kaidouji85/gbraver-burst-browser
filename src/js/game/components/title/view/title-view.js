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
  _rootId: string;

  constructor(params: Params) {
    this._rootId = domUuid();

    params.dom.innerHTML = `
      <div class="title" id="${this._rootId}">
        <img src="${resourceBasePath()}/logo.png"/>
        <p class="title_touch-start">TOUCH START</p>
      </div>
    `;

    const root = document.getElementById(this._rootId) || document.createElement('div');
    root.addEventListener('click', () => {
      params.onTouch();
    });
    root.addEventListener('touchstart', () => {
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
    const root = document.getElementById(this._rootId) || document.createElement('div');
    root.className = state.isVisible ? 'title' : 'title--invisible';
  }
}