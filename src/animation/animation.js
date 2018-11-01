// @flow

import {Tween} from '@tweenjs/tween.js';

/** アニメーション */
export class Animation {
  _start: Tween;
  _end: Tween;

  constructor(tween: Tween) {
    this._start = tween;
    this._end = tween;
  }

  play(): Promise<void> {
    return new Promise(resolve => {
      this._start.start();
      this._end.onComplete(() => {
        resolve();
      });
    });
  }

  chain(next: Animation, ...pararells: Animation[]): Animation {
    const pararellTweens = pararells.map(v => v._start);
    this._end.chain(next._start, ...pararellTweens);
    this._end = next._end;
    return this;
  }
}