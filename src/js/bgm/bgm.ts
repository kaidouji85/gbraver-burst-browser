import type { SoundResource } from "../resource/sound/resource";

/** BGMの状態 */
export type BGM = NowPlayingBGM | NoBGM;

/** すべてのBGM状態で共通するプロパティ */
type BGMStateProps = {
  /** マスター音量 */
  readonly masterVolume: number;
  /** 演出用のゲイン音量 */
  readonly gainVolume: number;
};

/** BGM再生中 */
export type NowPlayingBGM = BGMStateProps & {
  type: "NowPlayingBGM";
  /** 再生中のBGM */
  readonly resource: SoundResource;
};

/** BGMなし */
export type NoBGM = BGMStateProps & {
  type: "NoBGM";
};
