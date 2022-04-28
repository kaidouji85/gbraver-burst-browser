// @flow

import type {GbraverBurstBrowserConfig} from "../../../../src/js/game/config/browser-config";
import {isConfigChanged} from "../../../../src/js/game/config/browser-config";

const origin: GbraverBurstBrowserConfig = {webGLPixelRatio: 2, battleAnimationSpeed: 1};

test('WebGLピクセルレートの変更を正しく検知できる', () => {
  const update = {...origin, webGLPixelRatio: 1};
  expect(isConfigChanged(origin, update)).toBe(true);
});

test('戦闘アニメ再生速度の変更を正しく検知できる', () => {
  const update = {...origin, battleAnimationSpeed: 2};
  expect(isConfigChanged(origin, update)).toBe(true);
});

test('複数項目の変更を正しく検知できる', () => {
  const update = {...origin, webGLPixelRatio: 1, battleAnimationSpeed: 2};
  expect(isConfigChanged(origin, update)).toBe(true);
});

test('オブジェクトの内容が同じ場合、設定変更なしと見なす', () => {
  expect(isConfigChanged(origin, origin)).toBe(false);
});