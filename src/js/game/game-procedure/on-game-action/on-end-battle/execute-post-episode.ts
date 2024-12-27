import { PostEpisodeButtons } from "../../../dom-floaters/post-battle/post-battle-buttons";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { Story } from "../../../in-progress/story";

/**
 * エピソード終了後処理を実行する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns inProgress更新結果
 */
export async function executePostEpisode(
  props: Readonly<GameProps & { inProgress: Story }>,
  action: Readonly<EndBattle>,
): Promise<InProgress> {
  const { inProgress } = props;
  const { gameEnd } = action;
  const isPostEpisode =
    inProgress.story.type === "PlayingEpisode" &&
    gameEnd.result.type === "GameOver";
  if (!isPostEpisode) {
    return inProgress;
  }

  await props.domFloaters.showPostBattle({
    ...props,
    buttons: PostEpisodeButtons,
  });
  return inProgress;
}
