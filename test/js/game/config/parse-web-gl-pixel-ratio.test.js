// @flow

import {parseWebGLPixelRatio} from "../../../../src/js/game/config/browser-config";

test('WebGLPixelRatioで有効な整数ならパースできる', () => {
  expect(parseWebGLPixelRatio(2)).toBe(2);
});

test('文字列でも有効なPixelRatioならパースできる', () => {
  expect(parseWebGLPixelRatio('1')).toBe(1);
});

test('整数でも無効なpixelRatioならパースできない', () => {
  expect(parseWebGLPixelRatio(4)).toBe(null);
});

test('文字列の内容が整数でも、無効なpixelRatioならパースできない', () => {
  expect(parseWebGLPixelRatio('5')).toBe(null);
});

test('空文字の場合はパースできない', () => {
  expect(parseWebGLPixelRatio('')).toBe(null);
});

test('正しいpixelRatioが含まれている文字列でもパースできない', () => {
  expect(parseWebGLPixelRatio('hello, 1')).toBe(null);
});

test('undefinedの場合はパースできない', () => {
  expect(parseWebGLPixelRatio(undefined)).toBe(null);
});

test('nullの場合はパースできない', () => {
  expect(parseWebGLPixelRatio(null)).toBe(null);
});