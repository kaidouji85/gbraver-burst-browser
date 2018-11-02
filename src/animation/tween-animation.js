// @flow

import {Tween} from '@tweenjs/tween.js';

/** アニメーション */
export class TweenAnimation {
  _start: Tween;
  _end: Tween;

  constructor(start: Tween, end: Tween) {
    this._start = start;
    this._end = end;
  }

  play(): Promise<void> {
    return new Promise(resolve => {
      this._start.start();
      this._end.onComplete(() => {
        resolve();
      });
    });
  }

  chain(next: TweenAnimation, ...pararells: TweenAnimation[]): TweenAnimation {
    const pararellTweens = pararells.map(v => v._start);
    this._end.chain(next._start, ...pararellTweens);
    this._end = next._end;
    return this;
  }
}