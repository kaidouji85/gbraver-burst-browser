// @flow

import React from 'react';
import {render} from 'react-dom';
import type {LoadingState} from "../state/loading-state";
import {LoadingComponent} from "./loading-component";

/**
 * ローディングのビュー
 * 本画面のHTML要素はindex.htmlで定義されている
 */
export class LoadingView {
  _dom: HTMLElement;

  constructor() {
    this._dom = document.querySelector('#loading-scene') || document.createElement('div');
  }

  /**
   * 状態をビューに反映する
   *
   * @param state 状態
   */
  engage(state: LoadingState): void {
    render(LoadingComponent({
      isVisible: state.isVisible,
      completedRate: state.completedRate
    }), this._dom);
  }
}