// @flow

import {render} from 'react-dom';
import {TitlePresentation} from "./presentation";

/** タイトルのビュー */
export class TitleView {
  _dom: HTMLElement;

  constructor(dom: HTMLElement) {
    this._dom = dom;
  }

  /**
   * モデルをビューに反映させる
   *
   */
  engage(): void {
    render(TitlePresentation(), this._dom);
  }
}