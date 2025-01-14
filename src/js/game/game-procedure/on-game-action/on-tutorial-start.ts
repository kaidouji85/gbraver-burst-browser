import { batterySystemTutorial } from "../../episodes/battery-system-tutorial";
import { TutorialStart } from "../../game-actions/tutorial-start";
import { GameProps } from "../../game-props";
import { loadFullResource } from "../load-full-resource";
import { startEpisode } from "../start-episode";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: TutorialStart;
};

/**
 * チュートリアル開始時の処理
 * 本関数にはpropsを変更する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onTutorialStart(options: Options): Promise<void> {
  const { props } = options;
  if (!props.isFullResourceLoaded) {
    await loadFullResource(props);
  }

  const episode = batterySystemTutorial;
  props.inProgress = {
    type: "Story",
    story: { type: "PlayingEpisode", episode },
  };
  await startEpisode(props, episode);
}
