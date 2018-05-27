// @flow

import {Tween} from '@tweenjs/tween.js';

/** 複数Tweenをまとめたもの */
export type MultiTween = {
  /** スタート */
  start: Tween,
  /** エンド */
  end: Tween
};