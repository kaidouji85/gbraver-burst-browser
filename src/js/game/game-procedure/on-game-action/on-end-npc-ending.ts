import { fadeOut, stop } from "../../../bgm/bgm-operators";
import { EndNPCEnding } from "../../game-actions/end-npc-ending";
import { GameProps } from "../../game-props";
import { playTitleBGM } from "../play-title-bgm";
import { startTitle } from "../start-title";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: EndNPCEnding;
};

/**
 * NPCバトルエンディングが終了した際の処理
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function onEndNPCEnding(options: Options): Promise<void> {
  const { props } = options;
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
