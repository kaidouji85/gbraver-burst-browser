// @flow
import type {GameProps} from "../game-props";
import {createTutorial} from "../in-progress/tutorial";
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

  const tutorial = createTutorial();
  props.inProgress = tutorial;
  startTutorial(props, tutorial.playerId);
}