// @flow
import type {SelectTutorialStage} from "../game-actions";
import type {GameProps} from "../game-props";
import {TutorialStages, TutorialStagesInDevelopment} from "../tutorial-stages";
import {startTutorial} from "./start-tutorial";

/**
 * チュートリアルステージ選択時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onSelectTutorialStage(props: $ReadOnly<GameProps>, action: SelectTutorialStage): Promise<void> {
  const tutorialStages = props.canPlayTutorialInDevelopment ? TutorialStagesInDevelopment : TutorialStages;
  const stage = tutorialStages.find(v => v.id === action.id) ?? tutorialStages[0];
  await startTutorial(props, action.level, stage);
}