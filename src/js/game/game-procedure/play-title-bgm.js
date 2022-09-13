// @flow
import {fadeIn, play} from "../../bgm/bgm-operators";
import {createEmptySoundResource, SOUND_IDS} from "../../resource/sound";
import type {GameProps} from "../game-props";

/**
 * タイトルBGMを再生するヘルパー関数
 *
 * @param props ゲームプロパティ
 * @return 再生完了したら発火するPromise
 */
export async function playTitleBGM(props: $ReadOnly<GameProps>) {
  const titleBGM = props.resources.sounds.find(v => v.id === SOUND_IDS.TITLE_BGM) ?? createEmptySoundResource();
  await props.bgm.do(play(titleBGM));
  await props.bgm.do(fadeIn);
}