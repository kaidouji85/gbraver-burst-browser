import { GBraverBurstBrowserConfig } from "../../../../../src/js/game/config/browser-config";
import { DefaultConfig } from "../../../../../src/js/game/config/default-config";
import { parseBrowserConfig } from "../../../../../src/js/game/config/parser/browser-config";

test("ブラウザ設定を正しくパースできる", () => {
  const data: GBraverBurstBrowserConfig = {
    playerSelectorType: "open",
    webGLPixelRatio: 2,
    battleAnimationTimeScale: 1,
    battleWindowFontSize: "normal",
    bgmVolume: 1,
    seVolume: 1,
    battleControllerType: "BigButton",
    performanceStatsVisibility: "visible",
  };
  expect(parseBrowserConfig(data)).toEqual(data);
});

test("データ型が異なっても、ある程度はパースできる", () => {
  expect(
    parseBrowserConfig({
      playerSelectorType: "secret",
      webGLPixelRatio: "2",
      battleAnimationTimeScale: "1",
      bgmVolume: "1",
      seVolume: "1",
      battleControllerType: "BigButton",
      performanceStatsVisibility: "hidden",
    }),
  ).toEqual({
    playerSelectorType: "secret",
    webGLPixelRatio: 2,
    battleAnimationTimeScale: 1,
    bgmVolume: 1,
    seVolume: 1,
    battleControllerType: "BigButton",
    performanceStatsVisibility: "hidden",
  });
});

test("指定なしのプロパティは、デフォルト値で補完される", () => {
  expect(
    parseBrowserConfig({
      webGLPixelRatio: 2,
      battleAnimationTimeScale: 1,
    }),
  ).toEqual({
    ...DefaultConfig,
    webGLPixelRatio: 2,
    battleAnimationTimeScale: 1,
  });
});

test("空オブジェクトは、デフォルト設定にパースされる", () => {
  expect(parseBrowserConfig({})).toEqual(DefaultConfig);
});

test("nullは、デフォルト設定にパースされる", () => {
  expect(parseBrowserConfig(null)).toEqual(DefaultConfig);
});

test("undefinedは、デフォルト設定にパースされる", () => {
  expect(parseBrowserConfig(undefined)).toEqual(DefaultConfig);
});
