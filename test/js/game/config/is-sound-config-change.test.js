// @flow
import type { GbraverBurstBrowserConfig } from "../../../../src/js/game/config/browser-config";
import { isSoundConfigChanged } from "../../../../src/js/game/config/browser-config";

const origin: GbraverBurstBrowserConfig = {
  webGLPixelRatio: 2,
  battleAnimationTimeScale: 1,
  bgmVolume: 1,
  seVolume: 1,
};

test("BGM音量が変更された場合、音量関係設定が変更されたとみなす", () => {
  const update = { ...origin, bgmVolume: 0.4, seVolume: 0.2 };
  expect(isSoundConfigChanged(origin, update)).toBe(true);
});

test("音量関係以外が変更されても無視する", () => {
  const update = {
    ...origin,
    webGLPixelRatio: 1,
    battleAnimationTimeScale: 0.5,
  };
  expect(isSoundConfigChanged(origin, update)).toBe(false);
});

test("複数項目が変更されても、音量関係が含まれていれば反応する", () => {
  const update = {
    ...origin,
    webGLPixelRatio: 1,
    battleAnimationTimeScale: 0.25,
    bgmVolume: 0.5,
  };
  expect(isSoundConfigChanged(origin, update)).toBe(true);
});
