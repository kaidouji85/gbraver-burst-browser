import { z } from "zod";

import { GBraverBurstBrowserConfig } from "../browser-config";
import { DefaultConfig } from "../default-config";
import { BattleAnimationTimeScaleSchema } from "./battle-animation-time-scale";
import { BattleControllerTypeSchema } from "./battle-controller-type";
import { SoundVolumeSchema } from "./sound-volume";
import { StatsVisibilitySchema } from "./stats-visibility";
import { WebGLPixelRatioSchema } from "./web-gl-pixel-ratio";

/** ブラウザ設定 zod schema */
export const BrowserConfigSchema = z.object({
  webGLPixelRatio: WebGLPixelRatioSchema.catch(DefaultConfig.webGLPixelRatio),
  battleAnimationTimeScale: BattleAnimationTimeScaleSchema.catch(
    DefaultConfig.battleAnimationTimeScale,
  ),
  bgmVolume: SoundVolumeSchema.catch(DefaultConfig.bgmVolume),
  seVolume: SoundVolumeSchema.catch(DefaultConfig.seVolume),
  battleControllerType: BattleControllerTypeSchema.catch(
    DefaultConfig.battleControllerType,
  ),
  statsVisibility: StatsVisibilitySchema.catch(DefaultConfig.statsVisibility),
});

/**
 * ブラウザ設定をパースする
 * パースできない場合、デフォルト値を返す
 * @param config ブラウザ設定
 * @return パース結果
 */
export function parseBrowserConfig(config: unknown): GBraverBurstBrowserConfig {
  const result = BrowserConfigSchema.safeParse(config);
  return result.success ? result.data : DefaultConfig;
}
