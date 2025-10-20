import type { GBraverBurstBrowserConfig } from "../browser-config";
import { parseBrowserConfig } from "../parser/browser-config";
import { GBraverBurstBrowserConfigRepository } from "./repository";

/** 設定項目名とLocalStorageキーのマッピング */
const Keys = {
  /** ロボ、パイロット選択タイプ */
  PlayerSelectorType: "PlayerSelectorType",
  /** WebGLのピクセルレート */
  WebGLPixelRatio: "WebGLPixelRatio",
  /** 戦闘アニメタイムスケール */
  BattleAnimationTimeScale: "BattleAnimationTimeScale",
  /** 戦闘画面コントローラータイプ */
  BattleControllerType: "BattleControllerType",
  /** プレイヤーパイロットの表示設定 */
  PlayerPilotVisibility: "PlayerPilotVisibility",
  /** 戦闘ウインドウのフォントサイズ */
  BattleWindowFontSize: "BattleWindowFontSize",
  /** BGM音量 */
  BGMVolume: "BGMVolume",
  /** SE音量 */
  SEVolume: "SEVolume",
  /** パフォーマンス統計表示設定 */
  PerformanceStatsVisibility: "PerformanceStatsVisibility",
};

/** ブラウザ設定リポジトリのLocalStorage実装 */
class LocalStorageConfigRepository
  implements GBraverBurstBrowserConfigRepository
{
  /** @override */
  async save(config: GBraverBurstBrowserConfig): Promise<void> {
    localStorage.setItem(Keys.PlayerSelectorType, config.playerSelectorType);
    localStorage.setItem(Keys.WebGLPixelRatio, `${config.webGLPixelRatio}`);
    localStorage.setItem(
      Keys.BattleAnimationTimeScale,
      `${config.battleAnimationTimeScale}`,
    );
    localStorage.setItem(
      Keys.BattleControllerType,
      config.battleControllerType,
    );
    localStorage.setItem(
      Keys.PlayerPilotVisibility,
      config.playerPilotVisibility,
    );
    localStorage.setItem(
      Keys.BattleWindowFontSize,
      config.battleWindowFontSize,
    );
    localStorage.setItem(Keys.BGMVolume, `${config.bgmVolume}`);
    localStorage.setItem(Keys.SEVolume, `${config.seVolume}`);
    localStorage.setItem(
      Keys.PerformanceStatsVisibility,
      config.performanceStatsVisibility,
    );
  }

  /** @override */
  async load(): Promise<GBraverBurstBrowserConfig> {
    return parseBrowserConfig({
      playerSelectorType: localStorage.getItem(Keys.PlayerSelectorType),
      webGLPixelRatio: localStorage.getItem(Keys.WebGLPixelRatio),
      battleAnimationTimeScale: localStorage.getItem(
        Keys.BattleAnimationTimeScale,
      ),
      battleControllerType: localStorage.getItem(Keys.BattleControllerType),
      playerPilotVisibility: localStorage.getItem(Keys.PlayerPilotVisibility),
      battleWindowFontSize: localStorage.getItem(Keys.BattleWindowFontSize),
      bgmVolume: localStorage.getItem(Keys.BGMVolume),
      seVolume: localStorage.getItem(Keys.SEVolume),
      performanceStatsVisibility: localStorage.getItem(
        Keys.PerformanceStatsVisibility,
      ),
    });
  }
}

/**
 * ブラウザ設定リポジトリLocalStorage実装を生成する
 * @returns 生成結果
 */
export function createLocalStorageConfigRepository(): GBraverBurstBrowserConfigRepository {
  return new LocalStorageConfigRepository();
}
