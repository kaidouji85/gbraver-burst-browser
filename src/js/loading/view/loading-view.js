// @flow

import React from 'react';
import {render} from 'react-dom';
import type {LoadingModel} from "../model/loading-model";
import {LoadingScene} from "../../../components/loading-scene";

/**
 * ローディング画面のビュー
 * 本画面のHTML要素はindex.htmlで定義されている
 */
export class LoadingView {
  _dom: HTMLElement;

  constructor() {
    this._dom = document.querySelector('#loading-scene') || document.createElement('div');
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   */
  engage(model: LoadingModel): void {
    render(LoadingScene(model), this._dom);
  }
}