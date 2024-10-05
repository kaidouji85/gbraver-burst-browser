import type { GBraverBurstBrowserConfig } from "../../../../src/js/game/config/browser-config";
import { isSoundConfigChanged } from "../../../../src/js/game/config/config-changed";

const origin: GBraverBurstBrowserConfig = {
  playerSelectorType: "open",
  webGLPixelRatio: 2,
  battleAnimationTimeScale: 1,
  battleWindowFontSize: "normal",
  bgmVolume: 1,
  seVolume: 1,
  battleControllerType: "BigButton",
  performanceStatsVisibility: "hidden",
};

test("BGM音量が変更された場合、音量関係設定が変更されたとみなす", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    bgmVolume: 0.4,
    seVolume: 0.2,
  };
  expect(isSoundConfigChanged(origin, update)).toBe(true);
});

test("音量関係以外が変更されても無視する", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    webGLPixelRatio: 1,
    battleAnimationTimeScale: 0.5,
    battleWindowFontSize: "large",
    battleControllerType: "MiniController",
  };
  expect(isSoundConfigChanged(origin, update)).toBe(false);
});

test("複数項目が変更されても、音量関係が含まれていれば反応する", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    webGLPixelRatio: 1,
    battleAnimationTimeScale: 0.25,
    battleWindowFontSize: "large",
    bgmVolume: 0.5,
    battleControllerType: "MiniController",
  };
  expect(isSoundConfigChanged(origin, update)).toBe(true);
});
