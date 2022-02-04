// @flow

import type {GbraverBurstBrowserConfig} from "../../../../src/js/game/config/browser-config";
import {isConfigChanged} from "../../../../src/js/game/config/browser-config";

const origin: GbraverBurstBrowserConfig = {
  webGLPixelRatio: 2,
};

test('WebGLピクセルレートの変更を正しく検知できる', () => {
  const update = {...origin, webGLPixelRatio: 1};
  expect(isConfigChanged(origin, update)).toBe(true);
});

test('オブジェクトの内容が同じ場合、設定変更なしと見なす', () => {
  expect(isConfigChanged(origin, origin)).toBe(false);
});