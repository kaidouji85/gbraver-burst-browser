import { GameEnd } from "gbraver-burst-core";

import { PostBattleButtonConfig } from "../../../../dom-floaters/post-battle/post-battle-button-config";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import {
  PlayingEpisode,
  Story,
  StorySubFLow,
} from "../../../in-progress/story";
import {
  PostEpisodeButtons,
  PostEpisodeLoseButtons,
  PostEpisodeWinButtons,
  PostTutorialButtons,
  PostTutorialLoseButtons,
  PostTutorialWinButtons,
} from "../../../post-battle-buttons";
import { Episode } from "../../../story/episode";
import { getNextEpisode } from "../../../story/get-next-episode";
import { getNextTutorial } from "../../../story/get-next-tutorial";
import { isPlayerWin } from "../../../story/is-player-win";
import { isLastTutorial } from "../../../story/is-tutorial-end";
import { getEpisodes } from "../../get-episodes";

/** エピソード終了後の結果 */
type PostEpisodeResult = {
  /** バトル終了後のボタン */
  buttons: PostBattleButtonConfig[];
  /** サブフロー更新結果 */
  story: StorySubFLow;
};

/**
 * エピソード終了後の結果を作成する
 * @param options オプション
 * @param options.inProgress ストーリー進行状況
 * @param options.episodes エピソード一覧
 * @param options.gameEnd ゲーム終了情報
 * @returns 生成結果
 */
const createPostEpisodeResult = (options: {
  inProgress: Story & { story: PlayingEpisode };
  episodes: Episode[];
  gameEnd: GameEnd;
}): PostEpisodeResult => {
  const { inProgress, episodes, gameEnd } = options;
  const { story } = inProgress;
  const { episode: currentEpisode } = story;
  const isPlayerWon = isPlayerWin({ currentEpisode, gameEnd });
  const nextEpisode = getNextEpisode({ currentEpisode, episodes });

  let ret: PostEpisodeResult = { buttons: PostEpisodeButtons, story };
  if ((isPlayerWon || currentEpisode.isLosingEvent) && nextEpisode) {
    ret = {
      buttons: PostEpisodeWinButtons,
      story: { type: "GoingNextEpisode", currentEpisode, nextEpisode },
    };
  } else if (!isPlayerWon && !currentEpisode.isLosingEvent) {
    ret = { buttons: PostEpisodeLoseButtons, story };
  }
  return ret;
};

/**
 * チュートリアル終了後の結果を作成する
 * @param options オプション
 * @param options.inProgress ストーリー進行状況
 * @param options.episodes エピソード一覧
 * @param options.gameEnd ゲーム終了情報
 * @returns 生成結果
 */
const createPostEpisodeResultWhenTutorial = (options: {
  inProgress: Story & { story: PlayingEpisode };
  episodes: Episode[];
  gameEnd: GameEnd;
}): PostEpisodeResult => {
  const { inProgress, episodes, gameEnd } = options;
  const { story } = inProgress;
  const { episode: currentEpisode } = story;
  const isPlayerWon = isPlayerWin({ currentEpisode, gameEnd });
  const isFinalTutorial = isLastTutorial(currentEpisode, episodes);
  const nextEpisode = getNextTutorial({ currentEpisode, episodes });

  let ret: PostEpisodeResult = { buttons: PostTutorialButtons, story };
  if (
    (isPlayerWon || currentEpisode.isLosingEvent) &&
    !isFinalTutorial &&
    nextEpisode
  ) {
    ret = {
      buttons: PostTutorialWinButtons,
      story: { type: "GoingNextEpisode", currentEpisode, nextEpisode },
    };
  } else if (!isPlayerWon && !currentEpisode.isLosingEvent) {
    ret = { buttons: PostTutorialLoseButtons, story };
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
  const { isTutorial, story: currentStory } = props.inProgress;
  const { gameEnd } = action;
  if (currentStory.type !== "PlayingEpisode") {
    return inProgress;
  }

  const episodes = getEpisodes(props);
  const createResult = isTutorial
    ? createPostEpisodeResultWhenTutorial
    : createPostEpisodeResult;
  const { story, buttons } = createResult({
    inProgress: { ...inProgress, isTutorial, story: currentStory },
    episodes,
    gameEnd,
  });
  await props.postBattle.show({ ...props, buttons });
  return { ...inProgress, story };
}
