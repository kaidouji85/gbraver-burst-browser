import { fadeOut, stop } from "../../../../bgm/bgm-operators";
import { GameProps } from "../../../game-props";
import { StorySubFLow } from "../../../in-progress/story";
import { GotoEpisodeSelect } from "../../../post-battle";
import { EpisodeID } from "../../../story/episode";
import { EpisodeIDs } from "../../../story/episodes/episode-ids";
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
  props: GameProps;
  /** アクション */
  postAction: Readonly<GotoEpisodeSelect>;
};

/**
 * エピソード選択画面に遷移する
 * 本関数はprops.inProgressを変更する副作用がある
 * @param options オプション
 */
export async function gotoEpisodeSelect(options: Options) {
  const { props } = options;
  const { inProgress } = props;
  if (inProgress.type !== "Story") {
    return inProgress;
  }

  const { story } = inProgress;
  const initialEpisodeId = getInitialEpisodeId(story);
  await Promise.all([
    startEpisodeSelector(props, initialEpisodeId),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  playTitleBGM(props);
  props.inProgress = { ...inProgress, story: { type: "EpisodeSelect" } };
}
