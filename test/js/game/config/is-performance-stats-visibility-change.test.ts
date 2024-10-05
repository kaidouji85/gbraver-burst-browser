import { GBraverBurstBrowserConfig } from "../../../../src/js/game/config/browser-config";
import { isPerformanceStatsVisibilityChanged } from "../../../../src/js/game/config/config-changed";

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

test("パフォーマンス統計表示設定が変更されたことを正しく検知できる", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    performanceStatsVisibility: "visible",
  };
  expect(isPerformanceStatsVisibilityChanged(origin, update)).toBe(true);
});

test("パフォーマンス統計表示設定が変更されても無視する", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    webGLPixelRatio: 1,
    battleAnimationTimeScale: 0.5,
    battleControllerType: "MiniController",
  };
  expect(isPerformanceStatsVisibilityChanged(origin, update)).toBe(false);
});

test("複数項目が変更されても、パフォーマンス統計表示設定が含まれていれば反応する", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    webGLPixelRatio: 1,
    battleAnimationTimeScale: 0.25,
    battleWindowFontSize: "large",
    bgmVolume: 0.5,
    battleControllerType: "MiniController",
    performanceStatsVisibility: "visible",
  };
  expect(isPerformanceStatsVisibilityChanged(origin, update)).toBe(true);
});
