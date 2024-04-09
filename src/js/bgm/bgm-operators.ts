import { howlVolume } from "../resource/sound/howl-volume";
import type { SoundResource } from "../resource/sound/resource";
import { waitTime } from "../wait/wait-time";
import type { BGM } from "./bgm";

/**
 * BGMオペレータ
 *
 * @param bgm 現在のBGM
 * @return オペレーション後のBGM
 */
export type BGMOperator = (bgm: BGM) => Promise<BGM>;

/** フェードアウト */
export const fadeOut: BGMOperator = async (bgm: BGM): Promise<BGM> => {
  if (bgm.type === "NowPlayingBGM") {
    const duration = 500;
    bgm.resource.sound.fade(howlVolume(bgm.resource), 0, duration);
    await waitTime(duration);
  }

  return bgm;
};

/** フェードイン */
export const fadeIn: BGMOperator = async (bgm: BGM): Promise<BGM> => {
  if (bgm.type === "NowPlayingBGM") {
    const duration = 500;
    bgm.resource.sound.fade(0, howlVolume(bgm.resource), duration);
    await waitTime(duration);
  }

  return bgm;
};

/** BGM停止 */
export const stop = async (bgm: BGM): Promise<BGM> => {
  bgm.type === "NowPlayingBGM" && bgm.resource.sound.stop();
  return {
    type: "NoBGM",
  };
};

/**
 * BGMを再生する
 * BGMがすでに再生されている場合、強制的に停止して新しいBGMを再生する
 *
 * @param resource 再生するBGMの音リソース
 * @return BGMオペレータ
 */
export const play =
  (resource: SoundResource): BGMOperator =>
  async (bgm: BGM): Promise<BGM> => {
    bgm.type === "NowPlayingBGM" && bgm.resource.sound.stop();
    resource.sound.play();
    resource.sound.loop(true);
    resource.sound.volume(howlVolume(resource));
    return {
      type: "NowPlayingBGM",
      resource,
    };
  };
