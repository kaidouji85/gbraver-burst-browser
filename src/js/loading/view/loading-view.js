// @flow

import type {LoadingModel} from "../model/loading-model";

export const Root = '.loading';
export const CAPTION = '.loading__caption';
export const COMPLETED_RATE = '.loading__completed-rate';
export const COMPLETED_RATE_TEXT = '.loading__completed-rate__text';
export const COMPLETED_RATE_BAR = '.loading__completed-rate__bar__completed';

/**
 * ローディング画面のビュー
 * 本画面のHTML要素はindex.htmlで定義されている
 */
export class LoadingView {
  _root: HTMLElement;
  _caption: HTMLElement;
  _completedRate: HTMLElement;
  _completedRateText: HTMLElement;
  _completedRateBar: HTMLElement;

  constructor() {
    this._root = document.querySelector(Root) || document.createElement('div');
    this._caption = document.querySelector(CAPTION) || document.createElement('div');
    this._completedRate = document.querySelector(COMPLETED_RATE) || document.createElement('div');
    this._completedRateText = document.querySelector(COMPLETED_RATE_TEXT) || document.createElement('div');
    this._completedRateBar = document.querySelector(COMPLETED_RATE_BAR) || document.createElement('div');
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   */
  engage(model: LoadingModel): void {
    this._root.style.display = model.isVisible
      ? 'grid'
      : 'none';
    this._caption.style.display = model.caption.isVisible
      ? 'flex'
      : 'none';
    this._caption.innerText = model.caption.value;
    this._completedRate.style.display = model.completedRate.isVisible
      ? 'flex'
      : 'none';
    this._completedRateText.innerText = `LOADING... ${Math.floor(model.completedRate.value * 100)}%`;
    this._completedRateBar.style.width = `${model.completedRate.value * 100}%`;
  }
}