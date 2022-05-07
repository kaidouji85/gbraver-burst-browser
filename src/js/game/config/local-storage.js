// @flow
import type {BattleAnimationSpeed, GbraverBurstBrowserConfig, SoundVolume, WebGLPixelRatio} from "./browser-config";
import {parseBattleAnimationSpeed, parseSoundVolume, parseWebGLPixelRatio} from "./browser-config";

/** 設定項目名とLocalStorageキーのマッピング */
const LocalStorageKeys = {
  /** WebGLのピクセルレート */
  WebGLPixelRatio: 'WebGLPixelRatio',
  /** 戦闘アニメ再生速度 */
  BattleAnimationSpeed: 'BattleAnimationSpeed',
  /** BGM音量 */
  BGMVolume: 'BGMVolume',
  /** SE音量 */
  SEVolume: 'SEVolume',
}

/**
 * LocalStorageからGブレイバーバースト ブラウザ側設定項目を抽出する
 * 抽出できなかった場合、nullを返す
 * 
 * return 抽出結果
 */
export function configFromLocalStorage(): GbraverBurstBrowserConfig | null {
  const parsedWebGLPixelRatio = parseWebGLPixelRatio(localStorage.getItem(LocalStorageKeys.WebGLPixelRatio));
  const parsedBattleAnimeSpeed = parseBattleAnimationSpeed(localStorage.getItem(LocalStorageKeys.BattleAnimationSpeed));
  const parsedBGMVolume = parseSoundVolume(localStorage.getItem(LocalStorageKeys.BGMVolume));
  const parsedSEVolume = parseSoundVolume(localStorage.getItem(LocalStorageKeys.SEVolume));
  if (parsedWebGLPixelRatio === null || parsedBattleAnimeSpeed === null || parsedBGMVolume === null || parsedSEVolume === null) {
    return null;
  }

  const webGLPixelRatio: WebGLPixelRatio = parsedWebGLPixelRatio;
  const battleAnimationSpeed: BattleAnimationSpeed = parsedBattleAnimeSpeed;
  const bgmVolume: SoundVolume = parsedBGMVolume;
  const seVolume: SoundVolume = parsedSEVolume;
  return {webGLPixelRatio, battleAnimationSpeed, bgmVolume, seVolume};
}

/**
 * Gブレイバーバースト ブラウザ側設定項目をLocalStorageに保存する
 *
 * @param config Gブレイバーバースト ブラウザ側設定項目
 */
export function saveConfigToLocalStorage(config: GbraverBurstBrowserConfig): void {
  localStorage.setItem(LocalStorageKeys.WebGLPixelRatio, `${config.webGLPixelRatio}`);
  localStorage.setItem(LocalStorageKeys.BattleAnimationSpeed, `${config.battleAnimationSpeed}`);
  localStorage.setItem(LocalStorageKeys.BGMVolume, `${config.bgmVolume}`);
  localStorage.setItem(LocalStorageKeys.SEVolume, `${config.seVolume}`);
}