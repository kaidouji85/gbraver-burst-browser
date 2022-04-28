// @flow

/** WebGLピクセルレート */
export type WebGLPixelRatio = number;

/** 設定可能なWebGLピクセルレートを集めたもの */
export const WebGLPixelRatios: WebGLPixelRatio[] = [0.5, 0.75, 1, 2];

/**
 * 任意のオブジェクトをWebGLピクセルレートにパースする
 * パースできない場合はnullを返す
 *
 * @return パース結果
 */
export function parseWebGLPixelRatio(origin: any): WebGLPixelRatio | null {
  const value = Number(origin);
  if (isNaN(value)) {
    return null;
  }

  return WebGLPixelRatios.find(v => v === value) ?? null;
}

/** 戦闘アニメ倍率 */
export type BattleAnimeSpeed = number;

/** 設定可能な戦闘アニメ倍率をあつめたもの */
export const BattleAnimationSpeeds: BattleAnimeSpeed[] = [1, 1.5, 2];

/**
 * 任意のオブジェクトを戦闘アニメ倍率にパースする
 * パースできない場合はnullを返す
 *
 * @param origin 
 * @return パース結果 
 */
export function parseBattleAnimationSpeed(origin: any): BattleAnimeSpeed | null {
  const value = Number(origin);
  if (isNaN(value)) {
    return null;
  }

  return BattleAnimationSpeeds.find(v => v === value) ?? null;
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