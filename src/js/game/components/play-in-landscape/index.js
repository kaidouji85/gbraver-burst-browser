// @flow

import {render} from 'react-dom';
import {PlayInLandscapePresentation} from "./presentation";

/** ランドスケープでプレイするよう促す警告 */
export class PlayInLandscape {
  constructor(dom: HTMLElement) {
    render(PlayInLandscapePresentation(), dom);
  }
}