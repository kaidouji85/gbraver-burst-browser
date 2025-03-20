import { GameProps } from "../../../game-props";
import { GoingNextEpisode, Story } from "../../../in-progress/story";
import { startEpisode } from "../../start-episode";

/**
 * 次のエピソードに画面遷移する
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function gotoNextEpisode(
  props: Readonly<
    GameProps & { inProgress: Story & { story: GoingNextEpisode } }
  >,
): Promise<void> {
  const playingEpisode = props.inProgress.story;
  await startEpisode(props, playingEpisode.nextEpisode);
}
