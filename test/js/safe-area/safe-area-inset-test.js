// @flow

import test from 'ava';
import {getSize} from "../../../src/js/safe-area/safe-area-inset";

test('セーフエリアインセットプロパティから、正しく数字だけを取り出すことができる', t => {
  const data = '12345px';
  const result = getSize(data);
  t.is(result, 12345);
});

test('パディングがあっても、数字だけを取得できる', t => {
  const data = '  12345px  ';
  const result = getSize(data);
  t.is(result, 12345);
});

test('マイナスでも正しく数字が取得できる', t => {
  const data = '-32px';
  const result = getSize(data);
  t.is(result, -32);
});

test('ピクセル指定でない場合、ゼロを返す', t => {
  const data = '3em';
  const result = getSize(data);
  t.is(result, 0);
});

test('空文字の場合は、ゼロを返す', t => {
  const data = '';
  const result = getSize(data);
  t.is(result, 0);
});