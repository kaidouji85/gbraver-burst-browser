import { PostEpisodeButtons } from "../../../dom-floaters/post-battle/post-battle-buttons";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";

/**
 * 条件を満たした場合、チュートリアル終了後処理を実行する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns チュートリアル終了後処理を実行したか否か、trueで実行した
 */
export async function executePostEpisodeIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<EndBattle>,
): Promise<boolean> {
  if (
    props.inProgress.type !== "Story" ||
    props.inProgress.story.type !== "PlayingEpisode" ||
    action.gameEnd.result.type !== "GameOver"
  ) {
    return false;
  }

  await props.domFloaters.showPostBattle({
    ...props,
    buttons: PostEpisodeButtons,
  });
  return true;
}
