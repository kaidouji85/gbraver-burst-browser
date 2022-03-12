// @flow
import type {SoundResource} from "../../resource/sound";

/**
 * @deprecated
 * BGMをフェードアウトする
 *
 * @param bgm 操作対象のBGM
 */
export function bgmFadeOut(bgm: SoundResource): void {
  bgm.sound.fade(bgm.initialVolume, 0, 1000);
}

/**
 * @deprecated
 * BGMをフェードインする
 *
 * @param bgm 操作対象のBGM
 */
export function bgmFadeIn(bgm: SoundResource): void {
  bgm.sound.fade(0, bgm.initialVolume, 1000);
}