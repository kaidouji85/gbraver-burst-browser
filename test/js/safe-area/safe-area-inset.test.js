// @flow

import {getSize} from "../../../src/js/safe-area/safe-area-inset";

test('セーフエリアインセットプロパティから、正しく数字だけを取り出すことができる', () => {
  const data = '12345px';
  const result = getSize(data);
  expect(result).toBe(12345);
});

test('パディングがあっても、数字だけを取得できる', () => {
  const data = '  12345px  ';
  const result = getSize(data);
  expect(result).toBe(12345);
});

test('マイナスでも正しく数字が取得できる', () => {
  const data = '-32px';
  const result = getSize(data);
  expect(result).toBe(-32);
});

test('ピクセル指定でない場合、ゼロを返す', () => {
  const data = '3em';
  const result = getSize(data);
  expect(result).toBe(0);
});

test('空文字の場合は、ゼロを返す', () => {
  const data = '';
  const result = getSize(data);
  expect(result).toBe(0);
});

test('Windows10版Chromeが返すCSSカスタムプロパティでも、正しく値を取得することができる', () => {
  const data = ' 12px';
  const result = getSize(data);
  expect(result).toBe(12);
});
