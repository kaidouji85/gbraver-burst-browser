import { fadeIn, play } from "../../bgm/bgm-operators";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import type { GameProps } from "../game-props";

/**
 * タイトルBGMを再生するヘルパー関数
 *
 * @param props ゲームプロパティ
 * @returns 再生完了したら発火するPromise
 */
export async function playTitleBGM(props: Readonly<GameProps>) {
  const titleBGM =
    props.resources.sounds.find((v) => v.id === SOUND_IDS.TITLE_BGM) ??
    createEmptySoundResource();
  await props.bgm.do(play(titleBGM));
  await props.bgm.do(fadeIn);
}
