import { TutorialEpisodes, TutorialEpisodesInDevelopment } from "../episodes";
import { SelectEpisode } from "../game-actions/select-episode";
import type { GameProps } from "../game-props";
import type { Story } from "../in-progress/story";
import { startTutorial } from "./start-tutorial";

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
  const tutorialStages = props.canPlayTutorialInDevelopment
    ? TutorialEpisodesInDevelopment
    : TutorialEpisodes;
  const stage =
    tutorialStages.find((v) => v.id === action.id) ?? tutorialStages[0];
  props.inProgress = {
    ...inProgress,
    story: {
      type: "PlayingEpisode",
      episode: stage,
      level: action.level,
    },
  };
  await startTutorial(props, action.level, stage);
}
