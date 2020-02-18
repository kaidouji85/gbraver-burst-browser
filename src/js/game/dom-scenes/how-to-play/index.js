// @flow

import {HowToPlayView} from "./view/how-to-play-view";
import {howToPlayMovieURL} from "../../../how-to-play/how-to-play-movie";

export class HowToPlay {
  _view: HowToPlayView;

  constructor(dom: HTMLElement) {
    this._view = new HowToPlayView({
      dom: dom,
      movieURL: howToPlayMovieURL()
    });
  }
}