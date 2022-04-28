// @flow
import type {BattleAnimationSpeed, GbraverBurstBrowserConfig, WebGLPixelRatio} from "./browser-config";
import {parseBattleAnimationSpeed, parseWebGLPixelRatio} from "./browser-config";

/** 設定項目名とLocalStorageキーのマッピング */
const LocalStorageKeys = {
  /** WebGLのピクセルレート */
  WebGLPixelRatio: 'WebGLPixelRatio',
  /** 戦闘アニメ再生速度 */
  BattleAnimationSpeed: 'BattleAnimationSpeed',
}

/**
 * LocalStorageからGブレイバーバースト ブラウザ側設定項目を抽出する
 * 抽出できなかった場合、nullを返す
 * 
 * return 抽出結果
 */
export function configFromLocalStorage(): GbraverBurstBrowserConfig | null {
  const parsedWebGLPixelRatio = parseWebGLPixelRatio(localStorage.getItem(LocalStorageKeys.WebGLPixelRatio));
  const parsedBattleAnimeSpeed = parseBattleAnimationSpeed(localStorage.getItem(LocalStorageKeys.BattleAnimationSpeed))
  if (parsedWebGLPixelRatio === null || parsedBattleAnimeSpeed === null) {   
    return null;
  }

  const webGLPixelRatio: WebGLPixelRatio = parsedWebGLPixelRatio;
  const battleAnimationSpeed: BattleAnimationSpeed = parsedBattleAnimeSpeed;
  return {webGLPixelRatio, battleAnimationSpeed};
}

/**
 * Gブレイバーバースト ブラウザ側設定項目をLocalStorageに保存する
 *
 * @param config Gブレイバーバースト ブラウザ側設定項目
 */
export function saveConfigToLocalStorage(config: GbraverBurstBrowserConfig): void {
  localStorage.setItem(LocalStorageKeys.WebGLPixelRatio, `${config.webGLPixelRatio}`);
  localStorage.setItem(LocalStorageKeys.BattleAnimationSpeed, `${config.battleAnimationSpeed}`);
}