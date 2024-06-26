import { WebGLPixelRatios } from "../../../../../src/js/game/config/browser-config";
import { parseWebGLPixelRatio } from "../../../../../src/js/game/config/parser/web-gl-pixel-ratio";

test("有効なWebGLPixelRatioはパースできる", () => {
  WebGLPixelRatios.forEach((v) => {
    expect(parseWebGLPixelRatio(v)).toBe(v);
  });
});

test("文字列でも有効なWebGLPixelRatioならパースできる", () => {
  expect(parseWebGLPixelRatio("0.5")).toBe(0.5);
});

test("無効なWebGLPixelRatioはパースできない", () => {
  expect(parseWebGLPixelRatio(4)).toBe(null);
});

test("有効なWebGLPixelRatioでない文字列はパースできない", () => {
  expect(parseWebGLPixelRatio("2x")).toBe(null);
});

test("空文字の場合はパースできない", () => {
  expect(parseWebGLPixelRatio("")).toBe(null);
});

test("undefinedの場合はパースできない", () => {
  expect(parseWebGLPixelRatio(undefined)).toBe(null);
});

test("nullの場合はパースできない", () => {
  expect(parseWebGLPixelRatio(null)).toBe(null);
});
