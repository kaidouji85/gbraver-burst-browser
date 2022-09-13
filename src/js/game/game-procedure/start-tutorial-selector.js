// @flow
import type {GameProps} from "../game-props";
import {TutorialStages, TutorialStagesInDevelopment} from "../tutorial-stages";

/**
 * チュートリアルステージセレクタを開始するヘルパー関数
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function startTutorialSelector(props: $ReadOnly<GameProps>) {
  await props.fader.fadeOut();
  const tutorialStages = props.canPlayTutorialInDevelopment ? TutorialStagesInDevelopment : TutorialStages;
  const stages = tutorialStages.map(stage => ({id: stage.id, title: stage.title.join('')}));
  props.domScenes.startTutorialSelector(props.resources, stages);
  await props.fader.fadeIn();
}
