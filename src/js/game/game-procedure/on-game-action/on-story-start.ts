import { StoryStart } from "../../game-actions/story-start";
import { GameProps } from "../../game-props";
import { loadFullResource } from "../load-full-resource";
import { startEpisodeSelector } from "../start-episode-selector";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: StoryStart;
};

/**
 * ストーリーモード開始時の処理
 * 本関数にはpropsを変更する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onStoryStart(options: Options): Promise<void> {
  const { props } = options;
  if (!props.isFullResourceLoaded) {
    await loadFullResource(props);
  }

  await startEpisodeSelector(props);
  props.inProgress = {
    type: "Story",
    isTutorial: false,
    story: { type: "EpisodeSelect" },
  };
}
