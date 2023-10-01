import { Episodes, EpisodesInDevelopment } from "../episodes";
import { SelectEpisode } from "../game-actions/select-episode";
import type { GameProps } from "../game-props";
import type { Story } from "../in-progress/story";
import { startEpisode } from "./start-episode";

/**
 * エピソード選択時の処理
 * 本関数にはinProgressを変更する副作用がある
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onSelectEpisode(
  props: GameProps,
  action: SelectEpisode,
): Promise<void> {
  if (props.inProgress.type !== "Story") {
    return;
  }

  const inProgress: Story = props.inProgress;
  const tutorialStages = props.canPlayEpisodeInDevelopment
    ? EpisodesInDevelopment
    : Episodes;
  const episode =
    tutorialStages.find((v) => v.id === action.id) ?? tutorialStages[0];
  props.inProgress = {
    ...inProgress,
    story: {
      type: "PlayingEpisode",
      episode,
      level: action.level,
    },
  };
  await startEpisode(props, episode);
}
