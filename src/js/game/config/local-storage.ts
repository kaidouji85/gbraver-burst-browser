import type {
  BattleAnimationTimeScale,
  GbraverBurstBrowserConfig,
  GbraverBurstBrowserConfigRepository,
  SoundVolume,
  WebGLPixelRatio,
} from "./browser-config";
import {
  parseBattleAnimationTimeScale,
  parseSoundVolume,
  parseWebGLPixelRatio,
} from "./browser-config";
import { DefaultConfig } from "./default-config";

/** 設定項目名とLocalStorageキーのマッピング */
const Keys = {
  /** WebGLのピクセルレート */
  WebGLPixelRatio: "WebGLPixelRatio",

  /** 戦闘アニメタイムスケール */
  BattleAnimationTimeScale: "BattleAnimationTimeScale",

  /** BGM音量 */
  BGMVolume: "BGMVolume",

  /** SE音量 */
  SEVolume: "SEVolume",
};

/** ブラウザ設定リポジトリのLocalStorage実装 */
class LocalStorageConfigRepository
  implements GbraverBurstBrowserConfigRepository
{
  /** @override */
  async save(config: GbraverBurstBrowserConfig): Promise<void> {
    localStorage.setItem(Keys.WebGLPixelRatio, `${config.webGLPixelRatio}`);
    localStorage.setItem(
      Keys.BattleAnimationTimeScale,
      `${config.battleAnimationTimeScale}`
    );
    localStorage.setItem(Keys.BGMVolume, `${config.bgmVolume}`);
    localStorage.setItem(Keys.SEVolume, `${config.seVolume}`);
  }

  /** @override */
  async load(): Promise<GbraverBurstBrowserConfig> {
    const webGLPixelRatio: WebGLPixelRatio =
      parseWebGLPixelRatio(localStorage.getItem(Keys.WebGLPixelRatio)) ??
      DefaultConfig.webGLPixelRatio;
    const battleAnimationTimeScale: BattleAnimationTimeScale =
      parseBattleAnimationTimeScale(
        localStorage.getItem(Keys.BattleAnimationTimeScale)
      ) ?? DefaultConfig.battleAnimationTimeScale;
    const bgmVolume: SoundVolume =
      parseSoundVolume(localStorage.getItem(Keys.BGMVolume)) ??
      DefaultConfig.bgmVolume;
    const seVolume: SoundVolume =
      parseSoundVolume(localStorage.getItem(Keys.SEVolume)) ??
      DefaultConfig.seVolume;
    return {
      webGLPixelRatio,
      battleAnimationTimeScale,
      bgmVolume,
      seVolume,
    };
  }
}
/**
 * ブラウザ設定リポジトリLocalStorage実装を生成する
 * @return 生成結果
 */

export function createLocalStorageConfigRepository(): GbraverBurstBrowserConfigRepository {
  return new LocalStorageConfigRepository();
}
