// @flow

import {HowToPlayView} from "./view/how-to-play-view";
import {howToPlayMovieURL} from "../../../how-to-play/how-to-play-movie";
import type {HowToPlayState} from "./state/how-to-play-state";
import {createInitialState} from "./state/initial-state";

/**
 * 遊び方シーン
 */
export class HowToPlay {
  _state: HowToPlayState;
  _view: HowToPlayView;

  constructor(dom: HTMLElement) {
    this._state = createInitialState();
    this._view = new HowToPlayView({
      dom: dom,
      movieURL: howToPlayMovieURL()
    });
  }


}