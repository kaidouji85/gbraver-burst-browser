import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PlayingEpisode } from "../../../in-progress/story";
import { GotoEpisodeSelect } from "../../../post-battle";
import { playTitleBGM } from "../../play-title-bgm";
import { startEpisodeSelector } from "../../start-episode-selector";

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
  if (
    props.inProgress.type === "Story" &&
    props.inProgress.story.type === "PlayingEpisode"
  ) {
    const playingEpisode: PlayingEpisode = props.inProgress.story;
    props.domFloaters.hiddenPostBattle();
    await startEpisodeSelector(props, playingEpisode.episode.id);
    playTitleBGM(props);
    return { type: "Story", story: { type: "EpisodeSelect" } };
  }

  return props.inProgress;
}
