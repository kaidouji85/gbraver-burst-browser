import type { GbraverBurstBrowserConfig } from "../../../../src/js/game/config/browser-config";
import { isConfigChanged } from "../../../../src/js/game/config/config-changed";

const origin: GbraverBurstBrowserConfig = {
  webGLPixelRatio: 2,
  battleAnimationTimeScale: 1,
  bgmVolume: 1,
  seVolume: 1,
  battleControllerType: "BigButton",  // TODO 変更検知テストを実装する
};

test("WebGLピクセルレートの変更を正しく検知できる", () => {
  const update: GbraverBurstBrowserConfig = { ...origin, webGLPixelRatio: 1 };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("戦闘アニメ再生速度の変更を正しく検知できる", () => {
  const update: GbraverBurstBrowserConfig = {
    ...origin,
    battleAnimationTimeScale: 0.5,
  };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("BGM音量の変更を正しく検知できる", () => {
  const update: GbraverBurstBrowserConfig = { ...origin, bgmVolume: 0.5 };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("SE音量の変更を正しく検知できる", () => {
  const update: GbraverBurstBrowserConfig = { ...origin, seVolume: 0.5 };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("戦闘シーンコントトーラータイプ", () => {

});

test("複数項目の変更を正しく検知できる", () => {
  const update: GbraverBurstBrowserConfig = {
    ...origin,
    webGLPixelRatio: 1,
    battleAnimationTimeScale: 0.25,
    bgmVolume: 0.5,
    seVolume: 0.2,
  };
  expect(isConfigChanged(origin, update)).toBe(true);
});

test("オブジェクトの内容が同じ場合、設定変更なしと見なす", () => {
  expect(isConfigChanged(origin, origin)).toBe(false);
});
