import { GameEnd } from "gbraver-burst-core";

import { PostBattleButtonConfig } from "../../../../dom-floaters/post-battle/post-battle-button-config";
import { Episode } from "../../../episodes/episode";
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
import { getEpisodes } from "../../get-episodes";

/** createPostEpisodeResultのオプション */
type CreatePostEpisodeResultOptions = {
  /** 現在のステート */
  inProgress: Story & { story: PlayingEpisode };
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
  const { inProgress, episodes, gameEnd } = options;
  const { story, isTutorial } = inProgress;
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

  const defaultButtons = isTutorial ? PostTutorialButtons : PostEpisodeButtons;
  let ret: PostEpisodeResult = { buttons: defaultButtons, story };
  if ((isPlayerWin || currentEpisode.isLosingEvent) && nextEpisode) {
    const buttons = isTutorial ? PostTutorialWinButtons : PostEpisodeWinButtons;
    ret = {
      buttons,
      story: { type: "GoingNextEpisode", currentEpisode, nextEpisode },
    };
  } else if (!isPlayerWin && !currentEpisode.isLosingEvent) {
    const buttons = isTutorial
      ? PostTutorialLoseButtons
      : PostEpisodeLoseButtons;
    ret = { buttons, story };
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
    inProgress: { ...inProgress, story: inProgress.story },
    episodes: getEpisodes(props),
    gameEnd,
  });
  await props.postBattle.show({ ...props, buttons });
  return { ...inProgress, story };
}
