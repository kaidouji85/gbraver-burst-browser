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
