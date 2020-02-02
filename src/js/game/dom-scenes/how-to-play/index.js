// @flow

import {HowToPlayView} from "./view/how-to-play-view";

/** 遊び方シーン */
export class HowToPlay {
  _view: HowToPlayView;

  constructor(dom: HTMLElement) {
    this._view = new HowToPlayView(dom);
  }
}