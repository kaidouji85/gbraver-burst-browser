import { GBraverBurstBrowserConfig } from "./browser-config";

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
    origin.battleWindowFontSize !== update.battleWindowFontSize ||
    origin.battleControllerType !== update.battleControllerType ||
    origin.playerPilotVisibility !== update.playerPilotVisibility ||
    origin.battleAnimationTimeScale !== update.battleAnimationTimeScale ||
    origin.bgmVolume !== update.bgmVolume ||
    origin.seVolume !== update.seVolume ||
    origin.performanceStatsVisibility !== update.performanceStatsVisibility
  );
}
