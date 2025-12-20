import { SoundResource } from "../resource/sound/resource";
import { waitTime } from "../wait/wait-time";
import { BGM } from "./bgm";

/**
 * BGMオペレータ
 * @param bgm 現在のBGM
 * @returns オペレーション後のBGM
 */
export type BGMOperator = (bgm: BGM) => Promise<BGM>;

/** フェードアウト */
export const fadeOut: BGMOperator = async (bgm: BGM): Promise<BGM> => {
  if (bgm.type === "NowPlayingBGM") {
    const duration = 500;
    bgm.resource.sound.fade(
      bgm.masterVolume * bgm.gainVolume * bgm.resource.volumeScale,
      0,
      duration,
    );
    await waitTime(duration);
  }

  return bgm;
};

/** フェードイン */
export const fadeIn: BGMOperator = async (bgm: BGM): Promise<BGM> => {
  if (bgm.type === "NowPlayingBGM") {
    const duration = 500;
    bgm.resource.sound.fade(
      0,
      bgm.masterVolume * bgm.gainVolume * bgm.resource.volumeScale,
      duration,
    );
    await waitTime(duration);
  }

  return bgm;
};

/** BGM停止 */
export const stop = async (bgm: BGM): Promise<BGM> => {
  if (bgm.type === "NowPlayingBGM") {
    bgm.resource.sound.stop();
  }
  return {
    ...bgm,
    type: "NoBGM",
  };
};

/**
 * BGMのマスター音量を変更する
 * 本関数には設定画面における音量設定を指定すること
 * @param masterVolume BGMのマスター音量、0〜1の範囲
 * @returns BGMオペレータ
 */
export const changeMasterVolume =
  (masterVolume: number) =>
  async (bgm: BGM): Promise<BGM> => {
    if (bgm.type === "NowPlayingBGM") {
      bgm.resource.sound.volume(
        masterVolume * bgm.gainVolume * bgm.resource.volumeScale,
      );
    }

    return {
      ...bgm,
      masterVolume,
    };
  };

/**
 * ゲイン音量を変更する
 * @param gainVolume ゲイン音量、0〜1の範囲
 * @returns BGMオペレータ
 */
export const changeGainVolume =
  (gainVolume: number) =>
  async (bgm: BGM): Promise<BGM> => {
    if (bgm.type === "NowPlayingBGM") {
      bgm.resource.sound.volume(
        bgm.masterVolume * gainVolume * bgm.resource.volumeScale,
      );
    }

    return {
      ...bgm,
      gainVolume,
    };
  };

/**
 * BGMを再生する
 * BGMがすでに再生されている場合、強制的に停止して新しいBGMを再生する
 * @param resource 再生するBGMの音リソース
 * @returns BGMオペレータ
 */
export const play =
  (resource: SoundResource): BGMOperator =>
  async (bgm: BGM): Promise<BGM> => {
    if (bgm.type === "NowPlayingBGM") {
      bgm.resource.sound.stop();
    }
    resource.sound.play();
    resource.sound.loop(true);
    resource.sound.volume(
      bgm.masterVolume * bgm.gainVolume * resource.volumeScale,
    );
    return {
      ...bgm,
      type: "NowPlayingBGM",
      resource,
    };
  };
