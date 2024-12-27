import { GameProps } from "../../../game-props";
import { PlayingEpisode, Story } from "../../../in-progress/story";
import { startEpisode } from "../../start-episode";

/**
 * ストーリー画面に遷移する
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function gotoEpisode(
  props: Readonly<
    GameProps & { inProgress: Story & { story: PlayingEpisode } }
  >,
): Promise<void> {
  const playingEpisode = props.inProgress.story;
  props.domFloaters.hiddenPostBattle();
  await startEpisode(props, playingEpisode.episode);
}
