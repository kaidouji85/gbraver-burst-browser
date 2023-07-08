import type { GbraverBurstBrowserConfig } from "../browser-config";
import { parseBrowserConfig } from "../parser/browser-config";
import { GbraverBurstBrowserConfigRepository } from "./repository";

/** 設定項目名とLocalStorageキーのマッピング */
const Keys = {
  /** WebGLのピクセルレート */
  WebGLPixelRatio: "WebGLPixelRatio",

  /** 戦闘アニメタイムスケール */
  BattleAnimationTimeScale: "BattleAnimationTimeScale",

  /** 戦闘画面コントローラータイプ */
  BattleControllerType: "BattleControllerType",

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
      `${config.battleAnimationTimeScale}`,
    );
    localStorage.setItem(
      Keys.BattleControllerType,
      config.battleControllerType,
    );
    localStorage.setItem(Keys.BGMVolume, `${config.bgmVolume}`);
    localStorage.setItem(Keys.SEVolume, `${config.seVolume}`);
  }

  /** @override */
  async load(): Promise<GbraverBurstBrowserConfig> {
    return parseBrowserConfig({
      webGLPixelRatio: localStorage.getItem(Keys.WebGLPixelRatio),
      battleAnimationTimeScale: localStorage.getItem(
        Keys.BattleAnimationTimeScale,
      ),
      battleControllerType: localStorage.getItem(Keys.BattleControllerType),
      bgmVolume: localStorage.getItem(Keys.BGMVolume),
      seVolume: localStorage.getItem(Keys.SEVolume),
    });
  }
}

/**
 * ブラウザ設定リポジトリLocalStorage実装を生成する
 * @return 生成結果
 */
export function createLocalStorageConfigRepository(): GbraverBurstBrowserConfigRepository {
  return new LocalStorageConfigRepository();
}
