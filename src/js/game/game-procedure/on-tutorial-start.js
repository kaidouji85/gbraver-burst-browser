// @flow
import type {GameProps} from "../game-props";
import {createTutorial} from "../in-progress/tutorial";
import {TutorialStages, TutorialStagesInDevelopment} from "../tutorial-stages";
import {fullResourceLoading} from "./full-resource-loading";

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

  await props.fader.fadeOut();
  const tutorialStages = props.canPlayTutorialInDevelopment ? TutorialStagesInDevelopment : TutorialStages;
  const stages = tutorialStages.map(stage => ({id: stage.id, title: stage.title.join('')}));
  props.domScenes.startTutorialSelector(props.resources, stages);
  await props.fader.fadeIn();
  props.inProgress = createTutorial(tutorialStages);
}