// @flow
import type {GameProps} from "../game-props";
import {createTutorial} from "../in-progress/tutorial";
import {getCurrentTutorialStage} from "../tutorial";
import {TutorialStages, TutorialStagesInDevelopment} from "../tutorial-stages";
import {fullResourceLoading} from "./full-resource-loading";
import {startTutorial} from "./start-tutorial";

/**
 * チュートリアル開始時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onTutorialStart(props: GameProps): Promise<void> {
  if (!props.isFullResourceLoaded) {
    await fullResourceLoading(props);
  }

  const stages = props.canPlayTutorialInDevelopment ? TutorialStagesInDevelopment : TutorialStages;
  const tutorial = createTutorial(stages);
  const stage = getCurrentTutorialStage(tutorial.state);
  if (!stage) {
    return;
  }

  props.inProgress = tutorial;
  await startTutorial(props, stage);
}