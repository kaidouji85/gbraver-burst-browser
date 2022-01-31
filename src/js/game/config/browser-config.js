// @flow

/** WebGLピクセルレート */
export type WebGLPixelRatio = 1 | 2;

/** 設定可能なWebGLピクセルレートを集めたもの */
export const WebGLPixelRatios: WebGLPixelRatio[] = [1, 2];

/** Gブレイバーバースト ブラウザ側設定項目 */
export type GbraverBurstBrowserConfig = {
  /** WebGLピクセルレート */
  webGLPixelRatio: number
};