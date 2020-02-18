// @flow

import {HowToPlayView} from "./view/how-to-play-view";
import {howToPlayMovieURL} from "../../../how-to-play/how-to-play-movie";
import type {HowToPlayState} from "./state/how-to-play-state";
import {createInitialState} from "./state/initial-state";
import {show} from "./state/show";

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
    this._view.engage(this._state);
  }

  /**
   * 本シーンを表示する
   */
  show(): void {
    this._state = show(this._state);
    this._view.engage(this._state);
  }
}
