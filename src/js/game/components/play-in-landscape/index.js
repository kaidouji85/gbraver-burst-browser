// @flow

import {PlayInLandscapeView} from "./view/play-in-landscape-view";

/** ランドスケープ警告シーン */
export class PlayInLandscape {
  _view: PlayInLandscapeView;

  constructor(dom: HTMLElement) {
    this._view = new PlayInLandscapeView(dom);
  }
}