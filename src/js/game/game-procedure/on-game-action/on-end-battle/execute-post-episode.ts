import { PostBattleButtonConfig } from "../../../dom-floaters/post-battle/post-battle-button-config";
import {
  PostEpisodeButtons,
  PostEpisodeLoseButtons,
  PostEpisodeWinButtons,
} from "../../../dom-floaters/post-battle/post-battle-buttons";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { Story, StorySubFLow } from "../../../in-progress/story";
import { getEpisodes } from "../../get-episodes";

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

  const currentEpisode = inProgress.story.episode;
  const currentPlayer = currentEpisode.player;
  const isPlayerWin =
    gameEnd.result.type === "GameOver" &&
    gameEnd.result.winner === currentPlayer.playerId;
  const episodes = getEpisodes(props).filter(
    (e) => e.type === currentEpisode.type,
  );
  const currentEpisodeIndex = episodes.indexOf(currentEpisode);
  const nextEpisode = episodes.at(currentEpisodeIndex + 1);
  const { buttons, story } = ((): {
    story: StorySubFLow;
    buttons: PostBattleButtonConfig[];
  } => {
    if ((isPlayerWin || currentEpisode.isLosingEvent) && nextEpisode) {
      return {
        buttons: PostEpisodeWinButtons,
        story: { type: "GoingNextEpisode", currentEpisode, nextEpisode },
      };
    } else if (!isPlayerWin && !currentEpisode.isLosingEvent) {
      return {
        buttons: PostEpisodeLoseButtons,
        story: inProgress.story,
      };
    } else {
      return {
        buttons: PostEpisodeButtons,
        story: inProgress.story,
      };
    }
  })();
  await props.domFloaters.showPostBattle({ ...props, buttons });
  return { ...inProgress, story };
}
