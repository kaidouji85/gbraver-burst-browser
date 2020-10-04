// @flow

import type {LoadingState} from "../state/loading-state";
import {domUuid} from "../../../../uuid/dom-uuid";

/**
 * ローディングシーンのビュー
 */
export class LoadingView {
  _root: HTMLElement;
  _text: HTMLElement;
  _bar: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
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
    this._root.className = 'loading';
    this._root.style.display = 'flex';

    this._text = this._root.querySelector(`[data-id="${textId}"]`) || document.createElement('div');
    this._bar = this._root.querySelector(`[data-id="${barId}"]`) || document.createElement('div');

    this.setCompletedRate(0);
  }

  /**
   * ローディング進捗を変更する
   *
   * @param completedRate 0〜1で指定する進捗率、1で完了
   */
  setCompletedRate(completedRate: number): void {
    this._text.innerText = `LOADING... ${Math.floor(completedRate * 100)}%`;
    this._bar.style.width = `${completedRate * 100}%`
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