// @flow

import test from 'ava';
import {Tween} from '@tweenjs/tween.js';
import {tweenTime} from "../../../src/animation/tween-time";

test('シンプルなTweenの再生時間計算が正しい', t => {
  const tween = new Tween({})
    .to({}, 500);
  const time = tweenTime(tween);
  t.is(tweenTime(tween), 500);
});

test('delayがあるTweenの再生時間計算が正しい', t => {
  const tween = new Tween({})
    .to({}, 500)
    .delay(100);
  const time = tweenTime(tween);
  t.is(tweenTime(tween), 600);
});

test('リピートするTweenの再生時間計算が正しい', t => {
  const tween = new Tween({})
    .to({}, 500)
    .repeat(3);
  const time = tweenTime(tween);
  t.is(tweenTime(tween), 2000);
});

test('複雑なTweenの再生時間計算が正しい', t => {
  const tween = new Tween({})
    .to({}, 500)
    .repeat(4)
    .delay(300);
  const time = tweenTime(tween);
  t.is(tweenTime(tween), 2800);
});

test('再生時間が0の場合でも正しく動作する', t => {
  const tween = new Tween({})
    .to({}, 0);
  const time = tweenTime(tween);
  t.is(tweenTime(tween), 0);
});

test('連結されたTweenの場合、自分の再生時間だけ返す', t => {
  const tween1 = new Tween({})
    .to({}, 500);
  const tween2 = new Tween({})
    .to({}, 500);
  tween1.chain(tween2);
  t.is(tweenTime(tween1), 500)
});