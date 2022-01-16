// @flow

import {process} from '../../../src/js/animation/process';

test('processの再生時間は0である', () => {
  const v =process(() => {
    // NOP
  });
  expect(v._time).toBe(0);
});