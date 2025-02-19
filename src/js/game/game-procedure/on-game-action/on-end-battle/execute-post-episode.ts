import { GameEnd } from "gbraver-burst-core";

import { PostBattleButtonConfig } from "../../../../dom-floaters/post-battle/post-battle-button-config";
import {
  PostEpisodeButtons,
  PostEpisodeLoseButtons,
  PostEpisodeWinButtons,
} from "../../../../dom-floaters/post-battle/post-battle-buttons";
import { Episode } from "../../../episodes/episode";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import {
  PlayingEpisode,
  Story,
  StorySubFLow,
} from "../../../in-progress/story";
import { getEpisodes } from "../../get-episodes";

/** createPostEpisodeResultのオプション */
type CreatePostEpisodeResultOptions = {
  /** 現在のサブフロー */
  story: PlayingEpisode;
  /** エピソード一覧 */
  episodes: Episode[];
  /** ゲーム終了情報 */
  gameEnd: GameEnd;
};

/** エピソード終了後の結果 */
type PostEpisodeResult = {
  /** バトル終了後のボタン */
  buttons: PostBattleButtonConfig[];
  /** サブフロー更新結果 */
  story: StorySubFLow;
};

//TODO ユニットテストを書く
/**
 * エピソード終了後の結果を作成する
 * @param options オプション
 * @returns 生成結果
 */
const createPostEpisodeResult = (
  options: CreatePostEpisodeResultOptions,
): PostEpisodeResult => {
  const { story, episodes, gameEnd } = options;
  const currentEpisode = story.episode;
  const currentPlayer = currentEpisode.player;
  const sameTypeEpisodes = episodes.filter(
    (e) => e.type === currentEpisode.type,
  );
  const isPlayerWin =
    gameEnd.result.type === "GameOver" &&
    gameEnd.result.winner === currentPlayer.playerId;
  const currentEpisodeIndex = sameTypeEpisodes.indexOf(currentEpisode);
  const nextEpisode = sameTypeEpisodes.at(currentEpisodeIndex + 1);

  let ret: PostEpisodeResult = { buttons: PostEpisodeButtons, story };
  if ((isPlayerWin || currentEpisode.isLosingEvent) && nextEpisode) {
    ret = {
      buttons: PostEpisodeWinButtons,
      story: { type: "GoingNextEpisode", currentEpisode, nextEpisode },
    };
  } else if (!isPlayerWin && !currentEpisode.isLosingEvent) {
    ret = { buttons: PostEpisodeLoseButtons, story };
  }
  return ret;
};

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
  if (inProgress.story.type !== "PlayingEpisode") {
    return inProgress;
  }

  const { story, buttons } = createPostEpisodeResult({
    story: inProgress.story,
    episodes: getEpisodes(props),
    gameEnd,
  });
  await props.domFloaters.showPostBattle({ ...props, buttons });
  return { ...inProgress, story };
}
