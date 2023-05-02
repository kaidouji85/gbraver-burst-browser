import { BattleAnimationTimeScale } from "./schema/battle-animation-time-scale";
import { SoundVolume } from "./schema/sound-volume";
import { WebGLPixelRatio } from "./schema/web-gl-pixel-ratio";

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

/** ブラウザ設定リポジトリ */
export interface GbraverBurstBrowserConfigRepository {
  /**
   * ブラウザ設定を保存する
   *
   * @param config ブラウザ設定
   * @return 保存が完了したら発火するPromise
   */
  save(config: GbraverBurstBrowserConfig): Promise<void>;

  /**
   * ブラウザ設定を読み込む
   *
   * @return 読み込んだブラウザ設定
   */
  load(): Promise<GbraverBurstBrowserConfig>;
}
