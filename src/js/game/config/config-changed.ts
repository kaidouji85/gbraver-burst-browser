import { GbraverBurstBrowserConfig } from "./browser-config";

/**
 * 設定が変更されたか否かを判定する
 *
 * @param origin オリジナルの設定
 * @param update 更新後の設定
 * @return 判定結果、trueで設定変更された
 */
export function isConfigChanged(
  origin: GbraverBurstBrowserConfig,
  update: GbraverBurstBrowserConfig
): boolean {
  return (
    origin.webGLPixelRatio !== update.webGLPixelRatio ||
    origin.battleAnimationTimeScale !== update.battleAnimationTimeScale ||
    origin.battleControllerType !== update.battleControllerType ||
    isSoundConfigChanged(origin, update)
  );
}

/**
 * 音量関係の設定が変更されたか否かを判定する
 *
 * @param origin オリジナルの設定
 * @param update 更新後の設定
 * @return 判定結果、trueで設定変更された
 */
export function isSoundConfigChanged(
  origin: GbraverBurstBrowserConfig,
  update: GbraverBurstBrowserConfig
): boolean {
  return (
    origin.bgmVolume !== update.bgmVolume || origin.seVolume !== update.seVolume
  );
}
