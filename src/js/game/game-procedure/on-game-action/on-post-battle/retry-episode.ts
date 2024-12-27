import { GameProps } from "../../../game-props";
import { PlayingEpisode, Story } from "../../../in-progress/story";
import { startEpisode } from "../../start-episode";

/**
 * エピソードをリトライする
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function retryEpisode(
  props: Readonly<
    GameProps & { inProgress: Story & { story: PlayingEpisode } }
  >,
): Promise<void> {
  const playingEpisode = props.inProgress.story;
  props.domFloaters.hiddenPostBattle();
  await startEpisode(props, playingEpisode.episode);
}
