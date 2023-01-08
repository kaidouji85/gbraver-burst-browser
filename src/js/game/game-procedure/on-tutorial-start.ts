import type { GameProps } from "../game-props";
import { loadFullResource } from "./load-full-resource";
import { startTutorialSelector } from "./start-tutorial-selector";

/**
 * チュートリアル開始時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onTutorialStart(props: GameProps): Promise<void> {
  if (!props.isFullResourceLoaded) {
    await loadFullResource(props);
  }

  await startTutorialSelector(props);
  props.inProgress = {
    type: "Tutorial",
    subFlow: {
      type: "TutorialStageSelect",
    },
  };
}
