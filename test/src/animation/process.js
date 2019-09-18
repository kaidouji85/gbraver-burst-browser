// @flow

import test from 'ava';
import {process} from '../../../src/browser/animation/process';

test('processの再生時間は0である', t => {
  const v =process(() => {
    // NOP
  });
  t.is(v._time, 0);
});