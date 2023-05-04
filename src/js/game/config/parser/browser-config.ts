import { z } from "zod";
import {WebGLPixelRatioSchema} from "./web-gl-pixel-ratio";
import {BattleAnimationTimeScaleSchema} from "./battle-animation-time-scale";
import {SoundVolumeSchema} from "./sound-volume";
import {GbraverBurstBrowserConfig} from "../browser-config";
import { DefaultConfig} from "../default-config";

/** ブラウザ設定 zod schema */
export const BrowserConfigSchema = z.object({
  webGLPixelRatio: WebGLPixelRatioSchema
    .default(DefaultConfig.webGLPixelRatio)
    .catch(DefaultConfig.webGLPixelRatio),
  battleAnimationTimeScale: BattleAnimationTimeScaleSchema
    .default(DefaultConfig.battleAnimationTimeScale)
    .catch(DefaultConfig.battleAnimationTimeScale),
  bgmVolume: SoundVolumeSchema
    .default(DefaultConfig.bgmVolume)
    .catch(DefaultConfig.bgmVolume),
  seVolume: SoundVolumeSchema
    .default(DefaultConfig.seVolume)
    .catch(DefaultConfig.seVolume),
});

/**
 * ブラウザ設定をパースする
 * パースできない場合、デフォルト値を返す
 * @param config ブラウザ設定
 * @return パース結果
 */
export function parseBrowserConfig(config: unknown): GbraverBurstBrowserConfig {
  const result = BrowserConfigSchema.safeParse(config);
  return result.success ? result.data : DefaultConfig;
}