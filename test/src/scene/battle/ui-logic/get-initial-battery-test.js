// @flow

import test from 'ava';
import {getInitialBattery} from "../../../../../src/browser/scene/battle/ui-logic/battery-selector";

test('選択可能なバッテリー上限が1以上の場合、バッテリーセレクタの初期値は1になる', t => {
  const result = getInitialBattery(4);
  t.is(result, 1);
});

test('選択可能なバッテリー上限が0の場合、バッテリーセレクタの初期値は0になる', t => {
  const result = getInitialBattery(0);
  t.is(result, 0);
});