// @flow

import type {GbraverBurstBrowserConfig, WebGLPixelRatio} from "./browser-config";
import {parseWebGLPixexRatio} from "./browser-config";

/** 設定項目名とLocalStoregeキーのマッピング */
const Keys = {
  WebGLPixexRatio: 'WebGLPixexRatio'
}

/**
 * LocalStorageからGブレイバーバースト ブラウザ側設定項目を抽出する
 * 抽出できなかった場合、nullを返す
 * 
 * return 抽出結果
 */
export function fromLocalStorage(): GbraverBurstBrowserConfig | null {
  const parsedWebGLPixelRatio = parseWebGLPixexRatio(window.localStorage.getItem(Keys.WebGLPixexRatio));
  if (parsedWebGLPixelRatio === null) {   
    return null;
  }

  const webGLPixelRatio: WebGLPixelRatio = parsedWebGLPixelRatio;
  return {webGLPixelRatio}
}

/**
 * Gブレイバーバースト ブラウザ側設定項目をLocalStorageに保存する
 *
 * @param config Gブレイバーバースト ブラウザ側設定項目
 */
export function toLocalStorage(config: GbraverBurstBrowserConfig): void {
  window.localStorage.setItem(Keys.WebGLPixexRatio, config.webGLPixelRatio);
}