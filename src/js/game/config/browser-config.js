// @flow

/** WebGLピクセルレート */
export type WebGLPixelRatio = number;

/** 設定可能なWebGLピクセルレートを集めたもの */
export const WebGLPixelRatios: WebGLPixelRatio[] = [0.5, 0.75, 1, 2];

/**
 * 任意のオブジェクトをWebGLピクセルレートにパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @return パース結果
 */
export function parseWebGLPixelRatio(origin: any): WebGLPixelRatio | null {
  const value = Number(origin);
  if (isNaN(value)) {
    return null;
  }

  return WebGLPixelRatios.find(v => v === value) ?? null;
}

/** 戦闘アニメ再生速度(n倍速) */
export type BattleAnimationSpeed = number;

/** 設定可能な戦闘アニメ再生速度をあつめたもの */
export const BattleAnimationSpeeds: BattleAnimationSpeed[] = [1, 2, 4];

/**
 * 任意のオブジェクトを戦闘アニメ再生速度にパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @return パース結果 
 */
export function parseBattleAnimationSpeed(origin: any): BattleAnimationSpeed | null {
  const value = Number(origin);
  if (isNaN(value)) {
    return null;
  }

  return BattleAnimationSpeeds.find(v => v === value) ?? null;
}

/** 音量 */
export type SoundVolume = number;

/** 有効な音量 */
export const SoundVolumes: SoundVolume[] = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

/**
 * 任意のオブジェクトを音量にパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @return パース結果
 */
export function parseSoundVolume(origin: any): SoundVolume | null {
  const value = Number(origin);
  if (isNaN(value)) {
    return null;
  }

  return SoundVolumes.find(v => v === value) ?? null;
}

/** Gブレイバーバースト ブラウザ側設定項目 */
export type GbraverBurstBrowserConfig = {
  /** WebGLピクセルレート */
  webGLPixelRatio: WebGLPixelRatio,
  /** 戦闘アニメ再生速度 */
  battleAnimationSpeed: BattleAnimationSpeed,
  /** BGM音量 */
  bgmVolume: SoundVolume,
};

/**
 * 設定が変更されたか否かを判定する
 *
 * @param origin オリジナルの設定
 * @param update 更新後の設定
 * @return 判定結果、trueで設定変更された
 */
export function isConfigChanged(origin: GbraverBurstBrowserConfig, update: GbraverBurstBrowserConfig): boolean {
  return (origin.webGLPixelRatio !== update.webGLPixelRatio) || (origin.battleAnimationSpeed !== update.battleAnimationSpeed)
    || isSoundConfigChanged(origin, update);
}

/**
 * 音量関係の設定が変更されたか否かを判定する
 *
 * @param origin オリジナルの設定
 * @param update 更新後の設定
 * @return 判定結果、trueで設定変更された
 */
export function isSoundConfigChanged(origin: GbraverBurstBrowserConfig, update: GbraverBurstBrowserConfig): boolean {
  return (origin.bgmVolume !== update.bgmVolume);
}