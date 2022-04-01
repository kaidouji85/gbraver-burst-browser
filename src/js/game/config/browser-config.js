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
export function parseWebGLPixelRatio(origin: any): WebGLPixelRatio | null {
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

/**
 * 設定が変更されたか否かを判定する
 *
 * @param origin オリジナルの設定
 * @param update 更新後の設定
 * @return 判定結果、trueで設定変更された
 */
export function isConfigChanged(origin: GbraverBurstBrowserConfig, update: GbraverBurstBrowserConfig): boolean {
  return origin.webGLPixelRatio !== update.webGLPixelRatio;
}