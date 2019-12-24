// @flow

import {render} from 'react-dom';
import {playInLandscapeView} from "./play-in-landscape-view";

/** ランドスケープでプレイするよう促す警告 */
export class PlayInLandscape {
  constructor(dom: HTMLElement) {
    render(playInLandscapeView(), dom);
  }
}