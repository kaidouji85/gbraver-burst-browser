import { GBraverBurstBrowserConfig } from "./browser-config";

/**
 * 音量関係の設定が変更されたか否かを判定する
 * @param origin オリジナルの設定
 * @param update 更新後の設定
 * @returns 判定結果、trueで設定変更された
 */
export function isSoundConfigChanged(
  origin: GBraverBurstBrowserConfig,
  update: GBraverBurstBrowserConfig,
): boolean {
  return (
    origin.bgmVolume !== update.bgmVolume || origin.seVolume !== update.seVolume
  );
}

/**
 * パフォーマンス統計の表示設定が変更されたか否かを判定する
 * @param origin オリジナルの設定
 * @param update 更新後の設定
 * @returns 判定結果、trueで設定変更された
 */
export function isPerformanceStatsVisibilityChanged(
  origin: GBraverBurstBrowserConfig,
  update: GBraverBurstBrowserConfig,
): boolean {
  return origin.performanceStatsVisibility !== update.performanceStatsVisibility;
}

/**
 * 設定が変更されたか否かを判定する
 * @param origin オリジナルの設定
 * @param update 更新後の設定
 * @returns 判定結果、trueで設定変更された
 */
export function isConfigChanged(
  origin: GBraverBurstBrowserConfig,
  update: GBraverBurstBrowserConfig,
): boolean {
  return (
    origin.playerSelectorType !== update.playerSelectorType ||
    origin.webGLPixelRatio !== update.webGLPixelRatio ||
    origin.battleAnimationTimeScale !== update.battleAnimationTimeScale ||
    origin.battleControllerType !== update.battleControllerType ||
    isSoundConfigChanged(origin, update) ||
    origin.performanceStatsVisibility !== update.performanceStatsVisibility
  );
}
