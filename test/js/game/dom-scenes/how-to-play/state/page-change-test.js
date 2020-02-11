// @flow

import * as test from 'ava';
import {updatePage} from "../../../../../../src/js/game/dom-scenes/how-to-play/state/page-change";

test('プラス1ページが正しく実行できる', t => {
  const result = updatePage(3, 1, 10);
  t.is(result, 4);
});

test('マイナス1ページが正しく実行できる', t => {
  const result = updatePage(3, -1, 10);
  t.is(result, 2);
});

test('1ページより小さくならない', t => {
  const result = updatePage(1, -1, 10);
  t.is(result, 1);
});

test('最大ページ数より大きくならない', t => {
  const result = updatePage(10, 1, 10);
  t.is(result, 10);
});
