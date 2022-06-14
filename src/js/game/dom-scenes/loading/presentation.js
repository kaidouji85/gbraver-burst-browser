// @flow

import {domUuid} from "../../../uuid/dom-uuid";

/**
 * ローディングシーン プレゼンテーション
 */
export class LoadingPresentation {
  #root: HTMLElement;
  #text: HTMLElement;
  #bar: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    const textId = domUuid();
    const barId = domUuid();

    this.#root = document.createElement('div');
    this.#root.innerHTML = `
      <div class="loading__completed-rate">
        <div class="loading__completed-rate__text" data-id="${textId}"></div>
        <div class="loading__completed-rate__bar">
          <div class="loading__completed-rate__bar__completed" data-id="${barId}"></div>
        </div>
      </div>
    `;
    this.#root.className = 'loading';
    this.#root.style.display = 'flex';

    this.#text = this.#root.querySelector(`[data-id="${textId}"]`) || document.createElement('div');
    this.#bar = this.#root.querySelector(`[data-id="${barId}"]`) || document.createElement('div');

    this.setCompletedRate(0);
  }

  /**
   * ローディング進捗を変更する
   *
   * @param completedRate 0〜1で指定する進捗率、1で完了
   */
  setCompletedRate(completedRate: number): void {
    this.#text.innerText = `LOADING... ${Math.floor(completedRate * 100)}%`;
    this.#bar.style.width = `${completedRate * 100}%`
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}