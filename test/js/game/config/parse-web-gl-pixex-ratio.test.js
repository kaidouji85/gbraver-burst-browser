// @flow

import { parseWebGLPixexRatio } from "../../../../src/js/game/config/browser-config";

test('WebGLPixelRatioで有効な整数ならパースできる', () => {
  expect(parseWebGLPixexRatio(2)).toBe(2);
});

test('文字列でも有効なPixelRatioならパースできる', () => {
  expect(parseWebGLPixexRatio('1')).toBe(1);
});

test('整数でも無効なpixelRatioならパースできない', () => {
  expect(parseWebGLPixexRatio(4)).toBe(null);
});

test('文字列の内容が整数でも、無効なpixelRatioならパースできない', () => {
  expect(parseWebGLPixexRatio('5')).toBe(null);
});

test('空文字の場合はパースできない', () => {
  expect(parseWebGLPixexRatio('')).toBe(null);
});

test('正しいpixelRatioが含まれている文字列でもパースできない', () => {
  expect(parseWebGLPixexRatio('hello, 1')).toBe(null);
});

test('undefinedの場合はパースできない', () => {
  expect(parseWebGLPixexRatio(undefined)).toBe(null);
});

test('nullの場合はパースできない', () => {
  expect(parseWebGLPixexRatio(null)).toBe(null);
});