// @flow

import test from 'ava';
import {tween} from "../../../src/animation/tween";

test('シンプルなTweenの再生時間が正しくセットされている', t => {
  const v = tween({}, t => t
    .to({}, 500)
  );
  t.is(v._time, 500);
});

test('チェインした場合でも、正しい再生時間がセットされている', t => {
  const v = tween({}, t => t
    .to({}, 500)
  ).chain(tween({}, t => t.to(
    {}, 500
  )));
  t.is(v._time, 1000);
});