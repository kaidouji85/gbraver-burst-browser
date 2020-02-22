// @flow

import {HowToPlay} from "./how-to-play";

export class DOMDialogs {
  _howToPlay: HowToPlay;

  constructor() {
    const howToPlayDOM = document.getElementById("how-to-play")
      || document.createElement('div');
    this._howToPlay = new HowToPlay(howToPlayDOM);
  }

  showHowToPlay(): void {
    this._howToPlay.show();
  }

  hidden(): void {
    this._howToPlay.hidden();
  }
}