// @flow

import test from 'ava';
import {Tween} from '@tweenjs/tween.js';
import {tweenTime} from "../../src/animation/tween-time";

test('delay、repeatがないTweenは、durationが再生時間になる', t => {
  const tween = new Tween({}).to({}, 500);
  const time = tweenTime(tween);
  t.is(tweenTime(tween), 500);
});