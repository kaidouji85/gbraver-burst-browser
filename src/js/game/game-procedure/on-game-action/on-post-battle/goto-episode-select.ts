import { EpisodeID } from "../../../episodes/episode";
import { EpisodeIDs } from "../../../episodes/episode-ids";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { StorySubFLow } from "../../../in-progress/story";
import { GotoEpisodeSelect } from "../../../post-battle";
import { playTitleBGM } from "../../play-title-bgm";
import { startEpisodeSelector } from "../../start-episode-selector";

/**
 * 初期選択されているエピソードIDを取得する
 * @param story 現在のストーリーサブフロー
 * @returns 取得結果
 */
const getInitialEpisodeId = (story: StorySubFLow): EpisodeID => {
  switch (story.type) {
    case "PlayingEpisode":
      return story.episode.id;
    case "GoingNextEpisode":
      return story.currentEpisode.id;
    default:
      return EpisodeIDs.BATTERY_SYSTEM;
  }
};

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  postAction: Readonly<GotoEpisodeSelect>;
};

/**
 * エピソード選択画面に遷移する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 更新後のInProgress
 */
export async function gotoEpisodeSelect(options: Options): Promise<InProgress> {
  const { props } = options;
  const { inProgress } = props;
  if (inProgress.type !== "Story") {
    return inProgress;
  }

  const { story } = inProgress;
  const initialEpisodeId = getInitialEpisodeId(story);
  props.domFloaters.hiddenPostBattle();
  await startEpisodeSelector(props, initialEpisodeId);
  playTitleBGM(props);
  return { type: "Story", story: { type: "EpisodeSelect" } };
}
