import { BattleControllerType } from "../../td-scenes/battle/controller-type";

/** 有効なロボ、パイロット選択タイプ */
export const PlayerSelectorTypes = ["open", "secret"] as const;

/** ロボ、パイロット選択タイプ */
export type PlayerSelectorType = (typeof PlayerSelectorTypes)[number];

/** 設定可能なWebGLピクセルレートを集めたもの */
export const WebGLPixelRatios = [0.5, 0.75, 1, 2];

/** WebGLピクセルレート */
export type WebGLPixelRatio = (typeof WebGLPixelRatios)[number];

/** 設定可能な戦闘アニメタイムスケールをあつめたもの */
export const BattleAnimationTimeScales = [1, 0.5, 0.25] as const;

/** 戦闘アニメタイムスケール */
export type BattleAnimationTimeScale =
  (typeof BattleAnimationTimeScales)[number];

/** 有効な戦闘ウインドウのフォントサイズ */
export const BattleWindowFontSizes = ["small", "normal", "large"] as const;

/** 戦闘ウインドウのフォントサイズ */
export type BattleWindowFontSize = (typeof BattleWindowFontSizes)[number];

/** 有効な音量 */
export const SoundVolumes = [
  0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
] as const;

/** 音量 */
export type SoundVolume = (typeof SoundVolumes)[number];

/** パフォーマンス統計の表示設定 */
export type PerformanceStatsVisibility = "visible" | "hidden";

/** Gブレイバーバースト ブラウザ側設定項目 */
export type GBraverBurstBrowserConfig = {
  /** ロボ、パイロット選択タイプ */
  playerSelectorType: PlayerSelectorType;
  /** WebGLピクセルレート */
  webGLPixelRatio: WebGLPixelRatio;
  /** 戦闘アニメタイムスケール */
  battleAnimationTimeScale: BattleAnimationTimeScale;
  /** 戦闘ウインドウのフォントサイズ */
  battleWindowFontSize: BattleWindowFontSize;
  /** BGM音量 */
  bgmVolume: SoundVolume;
  /** SE音量 */
  seVolume: SoundVolume;
  /** 戦闘シーンコントローラータイプ */
  battleControllerType: BattleControllerType;
  /** パフォーマンス統計の表示設定 */
  performanceStatsVisibility: PerformanceStatsVisibility;
};
