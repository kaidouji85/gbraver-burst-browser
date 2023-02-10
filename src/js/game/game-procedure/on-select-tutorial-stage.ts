import { SelectTutorialStage } from "../game-actions/select-tutorial-stage";
import type { GameProps } from "../game-props";
import type { Tutorial } from "../in-progress/tutorial";
import {
  TutorialStages,
  TutorialStagesInDevelopment,
} from "../tutorial-stages";
import { startTutorial } from "./start-tutorial";

/**
 * チュートリアルステージ選択時の処理
 * 本関数にはinProgressを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onSelectTutorialStage(
  props: GameProps,
  action: SelectTutorialStage
): Promise<void> {
  if (props.inProgress.type !== "Tutorial") {
    return;
  }

  const inProgress: Tutorial = props.inProgress;
  const tutorialStages = props.canPlayTutorialInDevelopment
    ? TutorialStagesInDevelopment
    : TutorialStages;
  const stage =
    tutorialStages.find((v) => v.id === action.id) ?? tutorialStages[0];
  props.inProgress = {
    ...inProgress,
    subFlow: {
      type: "PlayingTutorialStage",
      stage,
      level: action.level,
    },
  };
  await startTutorial(props, action.level, stage);
}
