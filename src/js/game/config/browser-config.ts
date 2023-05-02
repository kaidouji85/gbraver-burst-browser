/** 戦闘アニメタイムスケール */
export type BattleAnimationTimeScale = number;

/** 設定可能な戦闘アニメタイムスケールをあつめたもの */
export const BattleAnimationTimeScales: BattleAnimationTimeScale[] = [
  1, 0.5, 0.25,
];

/** 音量 */
export type SoundVolume = number;

/** 有効な音量 */
export const SoundVolumes: SoundVolume[] = [
  0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
];

/** WebGLピクセルレート */
export type WebGLPixelRatio = number;

/** 設定可能なWebGLピクセルレートを集めたもの */
export const WebGLPixelRatios: WebGLPixelRatio[] = [0.5, 0.75, 1, 2]; 

/** Gブレイバーバースト ブラウザ側設定項目 */
export type GbraverBurstBrowserConfig = {
  /** WebGLピクセルレート */
  webGLPixelRatio: WebGLPixelRatio;

  /** 戦闘アニメタイムスケール */
  battleAnimationTimeScale: BattleAnimationTimeScale;

  /** BGM音量 */
  bgmVolume: SoundVolume;

  /** SE音量 */
  seVolume: SoundVolume;
};
