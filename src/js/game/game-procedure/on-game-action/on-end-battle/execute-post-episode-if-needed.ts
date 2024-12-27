import { PostEpisodeButtons } from "../../../dom-floaters/post-battle/post-battle-buttons";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";

/**
 * 条件を満たした場合、エピソード終了後処理を実行する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns エピソード終了後処理を実行したか否か、trueで実行した
 */
export async function executePostEpisodeIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<EndBattle>,
): Promise<boolean> {
  const { inProgress } = props;
  const { gameEnd } = action;
  const isPostEpisode =
    inProgress.type === "Story" &&
    inProgress.story.type === "PlayingEpisode" &&
    gameEnd.result.type === "GameOver";
  if (!isPostEpisode) {
    return false;
  }

  await props.domFloaters.showPostBattle({
    ...props,
    buttons: PostEpisodeButtons,
  });
  return true;
}
