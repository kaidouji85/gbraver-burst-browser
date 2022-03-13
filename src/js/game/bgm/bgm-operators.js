// @flow
import {wait} from "@gbraver-burst-network/browser-sdk/lib/wait/wait";
import type {SoundResource} from "../../resource/sound";
import type {BGM} from "./bgm";

/**
 * BGMオペレータ
 *
 * @param bgm 現在のBGM
 * @return オペレーション後のBGM
 */
export type BGMOperator = (bgm: BGM) => Promise<BGM>;

/** フェードアウト */
export const fadeOut: BGMOperator = async (bgm: BGM): Promise<BGM> => {
  if (bgm.type === 'NowPlayingBGM') {
    const duration = 1000;
    bgm.resource.sound.fade(bgm.resource.initialVolume, 0, duration);
    await wait(duration);
  }
  return bgm;
};

/** フェードアウトしてそのまま停止 */
export const stopWithFadeOut: BGMOperator = async (bgm: BGM): Promise<BGM> => {
  await fadeOut(bgm);
  bgm.type === 'NowPlayingBGM' && bgm.resource.sound.stop();
  return {type: 'NoBGM'};
}

/** フェードイン */
export const fadeIn: BGMOperator = async (bgm: BGM): Promise<BGM> => {
  if (bgm.type === 'NowPlayingBGM') {
    const duration = 1000;
    bgm.resource.sound.fade(0, bgm.resource.initialVolume, duration);
    await wait(duration);
  }
  return bgm;
};

/**
 * フェードインして再生開始
 *
 * @param resource 再生するBGMの音リソース
 * @return BGMオペレータ
 */
export const playWithFadeIn = (resource: SoundResource): BGMOperator => async (): Promise<BGM> => {
  resource.sound.play();
  resource.sound.loop(true);
  const bgm = {type: 'NowPlayingBGM', resource};
  await fadeIn(bgm);
  return bgm;
};