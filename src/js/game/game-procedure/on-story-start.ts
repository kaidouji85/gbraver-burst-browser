import type { GameProps } from "../game-props";
import { loadFullResource } from "./load-full-resource";
import { startEpisodeSelector } from "./start-episode-selector";

/**
 * ストーリーモード開始時の処理
 * 本関数にはpropsを変更する副作用がある
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function onStoryStart(props: GameProps): Promise<void> {
  if (!props.isFullResourceLoaded) {
    await loadFullResource(props);
  }

  await startEpisodeSelector(props);
  props.inProgress = {
    type: "Story",
    story: {
      type: "EpisodeSelect",
    },
  };
}
