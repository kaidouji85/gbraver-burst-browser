// @flow

import {Tween} from '@tweenjs/tween.js';
import {tweenTime} from "../../../src/js/animation/tween-time";

test('シンプルなTweenの再生時間計算が正しい', () => {
  const tween = new Tween({})
    .to({}, 500);
  expect(tweenTime(tween)).toBe(500);
});

test('delayがあるTweenの再生時間計算が正しい', () => {
  const tween = new Tween({})
    .to({}, 500)
    .delay(100);
  expect(tweenTime(tween)).toBe(600);
});

test('リピートするTweenの再生時間計算が正しい', () => {
  const tween = new Tween({})
    .to({}, 500)
    .repeat(3);
  expect(tweenTime(tween)).toBe(2000);
});

test('複雑なTweenの再生時間計算が正しい', () => {
  const tween = new Tween({})
    .to({}, 500)
    .repeat(4)
    .delay(300);
  expect(tweenTime(tween)).toBe(2800);
});

test('再生時間が0の場合でも正しく動作する', () => {
  const tween = new Tween({})
    .to({}, 0);
  expect(tweenTime(tween)).toBe(0);
});

test('連結されたTweenの場合、自分の再生時間だけ返す', () => {
  const tween1 = new Tween({})
    .to({}, 500);
  const tween2 = new Tween({})
    .to({}, 500);
  tween1.chain(tween2);
  expect(tweenTime(tween1)).toBe(500);
});
