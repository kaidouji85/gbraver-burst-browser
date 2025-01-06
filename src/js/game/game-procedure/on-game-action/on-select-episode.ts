import { SelectEpisode } from "../../game-actions/select-episode";
import { GameProps } from "../../game-props";
import { Story } from "../../in-progress/story";
import { getEpisodes } from "../get-episodes";
import { startEpisode } from "../start-episode";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: SelectEpisode;
};

/**
 * エピソード選択時の処理
 * 本関数にはinProgressを変更する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onSelectEpisode(options: Options): Promise<void> {
  const { props, action } = options;
  if (props.inProgress.type !== "Story") {
    return;
  }

  const inProgress: Story = props.inProgress;
  const episodes = getEpisodes(props);
  const episode = episodes.find((v) => v.id === action.id) ?? episodes[0];
  props.inProgress = {
    ...inProgress,
    story: {
      type: "PlayingEpisode",
      episode,
    },
  };
  await startEpisode(props, episode);
}
