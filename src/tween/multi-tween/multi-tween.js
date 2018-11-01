// @flow

import {Tween} from '@tweenjs/tween.js';

export type MultiTween = {
  /** スタート */
  start: Tween,
  /** エンド */
  end: Tween
};