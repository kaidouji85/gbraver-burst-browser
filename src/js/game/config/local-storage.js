// @flow

import type {GbraverBurstBrowserConfig, WebGLPixelRatio} from "./browser-config";
import {parseWebGLPixexRatio} from "./browser-config";

/** 設定項目名とLocalStoregeキーのマッピング */
const LocalStorageKeys = {
  /** WebGLのピクセルレート */
  WebGLPixexRatio: 'WebGLPixexRatio'
}

/**
 * LocalStorageからGブレイバーバースト ブラウザ側設定項目を抽出する
 * 抽出できなかった場合、nullを返す
 * 
 * return 抽出結果
 */
export function configFromLocalStorage(): GbraverBurstBrowserConfig | null {
  const parsedWebGLPixelRatio = parseWebGLPixexRatio(localStorage.getItem(LocalStorageKeys.WebGLPixexRatio));
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
export function saveConfigToLocalStorage(config: GbraverBurstBrowserConfig): void {
  localStorage.setItem(LocalStorageKeys.WebGLPixexRatio, `${config.webGLPixelRatio}`);
}