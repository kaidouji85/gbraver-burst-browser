import { TutorialStart } from "../../game-actions/tutorial-start";
import { GameProps } from "../../game-props";
import { batterySystemTutorial } from "../../story/episodes/battery-system-tutorial";
import { getEpisodes } from "../get-episodes";
import { startEpisode } from "../start-episode";
import { waitUntilSharedResourcesLoaded } from "../wait-until-shared-resources-loaded";

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

  props.domDialogBinder.hidden();
  await waitUntilSharedResourcesLoaded(props);

  const episodes = getEpisodes(props);
  const episode =
    episodes.filter((e) => e.isTutorial).at(0) ?? batterySystemTutorial;
  props.inProgress = {
    type: "Story",
    isTutorial: true,
    story: { type: "PlayingEpisode", episode },
  };
  await startEpisode({ props, episode });
}
