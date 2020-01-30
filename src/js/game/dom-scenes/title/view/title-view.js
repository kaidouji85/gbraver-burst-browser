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
        <img class="title__logo" src="${resourceBasePath()}/logo.png"/>
        <div class="title__buttons">
          <button class="title__buttons__game-start">ゲームスタート</button>
          <button class="title__buttons__how-to-play">遊び方</button>
        </div>
        <div class="title__copy-right">(C) 2020 Yuusuke Takeuchi</div>
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