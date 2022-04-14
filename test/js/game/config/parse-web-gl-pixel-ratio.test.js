// @flow

import {parseWebGLPixelRatio} from "../../../../src/js/game/config/browser-config";

test('2は有効なWebGLPixelRatioなのでパースできる', () => {
  expect(parseWebGLPixelRatio(2)).toBe(2);
});

test('1は有効なWebGLPixelRatioなのでパースできる', () => {
  expect(parseWebGLPixelRatio(1)).toBe(1);
});

test('0.75は有効なWebGLPixelRatioなのでパースできる', () => {
  expect(parseWebGLPixelRatio(0.75)).toBe(0.75);
});

test('0.5は有効なWebGLPixelRatioなのでパースできる', () => {
  expect(parseWebGLPixelRatio(0.5)).toBe(0.5);
});

test('文字列でも2は有効なWebGLPixelRatioなのでパースできる', () => {
  expect(parseWebGLPixelRatio('2')).toBe(2);
});

test('文字列でも1は有効なWebGLPixelRatioなのでパースできる', () => {
  expect(parseWebGLPixelRatio('1')).toBe(1);
});

test('文字列でも0.75は有効なWebGLPixelRatioなのでパースできる', () => {
  expect(parseWebGLPixelRatio('0.75')).toBe(0.75);
});

test('文字列でも0.5は有効なWebGLPixelRatioなのでパースできる', () => {
  expect(parseWebGLPixelRatio('0.5')).toBe(0.5);
});

test('無効なWebGLPixelRatioはパースできない', () => {
  expect(parseWebGLPixelRatio(4)).toBe(null);
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