// @flow

import type {LoadingModel} from "../model/loading-model";

export const LoadingDOM = '.loading';
export const LoadingCaptionDOM = '.loading__caption';
export const LoadingBarCompletedDOM = '.loading__bar_completed';

/**
 * ローディング画面のビュー
 * 本画面のHTML要素はindex.htmlで定義されている
 */
export class LoadingView {
  _root: HTMLElement;
  _caption: HTMLElement;
  _bar: HTMLElement;

  constructor() {
    this._root = document.querySelector(LoadingDOM) || new HTMLElement();
    this._caption = document.querySelector(LoadingCaptionDOM) || new HTMLElement();
    this._bar = document.querySelector(LoadingBarCompletedDOM) || new HTMLElement();
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   */
  engage(model: LoadingModel): void {
    this._root.style.display = model.isVisible
      ? 'flex'
      : 'none';
    this._caption.style.display = model.completedRate.isVisible
      ? 'block'
      : 'none';
    this._caption.innerHTML = `LOADING... ${Math.floor(model.completedRate.value * 100)}%`;
    this._bar.style.display = model.completedRate.isVisible
      ? 'block'
      : 'none';
    this._bar.style.width = `${model.completedRate.value * 100}%`;
  }
}