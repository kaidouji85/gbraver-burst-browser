import { fadeOut, stop } from "../../bgm/bgm-operators";
import type { GameProps } from "../game-props";
import { playTitleBGM } from "./play-title-bgm";
import { startTitle } from "./start-title";

/**
 * NPCバトルエンディングが終了した際の処理
 *
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function onEndNPCEnding(
  props: Readonly<GameProps>,
): Promise<void> {
  await Promise.all([
    (async () => {
      await props.fader.fadeOut();
      return await startTitle(props);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  await props.fader.fadeIn();
  playTitleBGM(props);
}
