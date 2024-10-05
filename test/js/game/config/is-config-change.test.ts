import type { GBraverBurstBrowserConfig } from "../../../../src/js/game/config/browser-config";
import { isConfigChanged } from "../../../../src/js/game/config/config-changed";

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

test("ロボ、パイロット選択タイプの変更を正しく検知できる", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    playerSelectorType: "secret",
  };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("WebGLピクセルレートの変更を正しく検知できる", () => {
  const update: GBraverBurstBrowserConfig = { ...origin, webGLPixelRatio: 1 };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("戦闘アニメ再生速度の変更を正しく検知できる", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    battleAnimationTimeScale: 0.5,
  };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("BGM音量の変更を正しく検知できる", () => {
  const update: GBraverBurstBrowserConfig = { ...origin, bgmVolume: 0.5 };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("SE音量の変更を正しく検知できる", () => {
  const update: GBraverBurstBrowserConfig = { ...origin, seVolume: 0.5 };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("戦闘シーンコントトーラータイプの変更を正しく検知できる", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    battleControllerType: "MiniController",
  };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("パフォーマンス統計の表示設定の変更を正しく検知できる", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    performanceStatsVisibility: "visible",
  };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("複数項目の変更を正しく検知できる", () => {
  const update: GBraverBurstBrowserConfig = {
    ...origin,
    playerSelectorType: "secret",
    webGLPixelRatio: 1,
    battleAnimationTimeScale: 0.25,
    battleWindowFontSize: "large",
    bgmVolume: 0.5,
    seVolume: 0.2,
    battleControllerType: "MiniController",
  };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("オブジェクトの内容が同じ場合、設定変更なしと見なす", () => {
  expect(isConfigChanged(origin, origin)).toBe(false);
});
