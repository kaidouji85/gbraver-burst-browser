import { PostBattleAction } from "../../game-actions/post-battle-action";
import { GameProps } from "../../game-props";
import { PlayingEpisode } from "../../in-progress/story";
import { startEpisode } from "../start-episode";

/**
 * 条件を満たしていればチュートリアルに遷移する
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 遷移した場合はtrue、遷移しなかった場合はfalse
 */
export async function gotoTutorialIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<PostBattleAction>,
): Promise<boolean> {
  if (
    action.action.type !== "Retry" ||
    props.inProgress.type !== "Story" ||
    props.inProgress.story.type !== "PlayingEpisode"
  ) {
    return false;
  }

  const playingEpisode: PlayingEpisode = props.inProgress.story;
  props.domFloaters.hiddenPostBattle();
  await startEpisode(props, playingEpisode.episode);
  return true;
}
