import { GameAction } from "../../game-actions";
import { SelectEpisode } from "../../game-actions/select-episode";
import { GameProps } from "../../game-props";
import { Story } from "../../in-progress/story";
import { getEpisodes } from "../get-episodes";
import { startEpisode } from "../start-episode";

/**
 * エピソード選択時の処理
 * 本関数にはinProgressを変更する副作用がある
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
async function onSelectEpisode(
  props: GameProps,
  action: SelectEpisode,
): Promise<void> {
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

/** アクションタイプ */
const actionType = "SelectEpisode";

/** エピソード選択時のイベントリスナーコンテナ */
export const selectEpisodeContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onSelectEpisode(props, action);
    }
  },
};
