import type { SoundResource } from "../resource/sound/resource";

/** BGMの状態 */
export type BGM = NowPlayingBGM | NoBGM;

/** BGM再生中 */
export type NowPlayingBGM = {
  type: "NowPlayingBGM";

  /** 再生中のBGM */
  resource: SoundResource;
};

/** BGMなし */
export type NoBGM = {
  type: "NoBGM";
};
