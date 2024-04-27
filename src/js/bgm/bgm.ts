import type { SoundResource } from "../resource/sound/resource";

/** BGMの状態 */
export type BGM = NowPlayingBGM | NoBGM;

/** すべてのBGM状態で共通するプロパティ */
type BGMStateProps = {
  /** 設定画面のBGM音量レベルをセットする */
  readonly bgmVolume: number;
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
