// @flow

/** WebGLピクセルレート */
export type WebGLPixelRatio = 1 | 2;

/** 設定可能なWebGLピクセルレートを集めたもの */
export const WebGLPixelRatios: [WebGLPixelRatio, WebGLPixelRatio] = [1, 2];

/**
 * 任意のオブジェクトをWebGLピクセルレートにパースする
 * パースできない場合はnullを返す
 *
 * @return パース結果
 */
export function parseWebGLPixexRatio(origin: any): WebGLPixelRatio | null {
  const parsedInt = parseInt(origin);
  if (isNaN(parsedInt)) {
    return null;
  }

  const finedWebGLPixelRatio = WebGLPixelRatios.find(v => v === parsedInt);
  return finedWebGLPixelRatio ?? null;
}

/** Gブレイバーバースト ブラウザ側設定項目 */
export type GbraverBurstBrowserConfig = {
  /** WebGLピクセルレート */
  webGLPixelRatio: number
};