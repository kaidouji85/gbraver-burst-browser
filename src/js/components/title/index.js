/// @flow

import {TitleView} from "./view";

/** タイトルシーン */
export class Title {
  _view: TitleView;

  constructor(dom: HTMLElement) {
    this._view = new TitleView(dom);
    this._view.engage();
  }
}