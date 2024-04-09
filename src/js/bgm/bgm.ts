import type { SoundResource } from "../resource/sound/resource";

/** BGMの状態 */
export type BGM = NowPlayingBGM | NoBGM;

/** すべての状態で共通するプロパティ */
type CommonProps = {
  /** 設定画面のBGM音量レベルをセットする */
  readonly bgmVolume: number;
}

/** BGM再生中 */
export type NowPlayingBGM = CommonProps & {
  type: "NowPlayingBGM";
  /** 再生中のBGM */
  readonly resource: SoundResource;
};

/** BGMなし */
export type NoBGM = CommonProps & {
  type: "NoBGM";
};
