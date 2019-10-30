// @flow

import React from 'react';
import {render} from 'react-dom';
import type {LoadingState} from "../state/loading-state";
import {LoadingPresentation} from "./presentation";

/**
 * ローディングのビュー
 * 本画面のHTML要素はindex.htmlで定義されている
 */
export class LoadingView {
  _dom: HTMLElement;

  constructor(dom: HTMLElement) {
    this._dom = dom;
  }

  /**
   * 状態をビューに反映する
   *
   * @param state 状態
   */
  engage(state: LoadingState): void {
    render(LoadingPresentation({
      isVisible: state.isVisible,
      completedRate: state.completedRate
    }), this._dom);
  }
}