import { MAX_LOADING_TIME } from "../../dom-scenes/dom-scene-binder/max-loading-time";
import { EpisodeSelector } from "../../dom-scenes/episode-selector";
import { waitTime } from "../../wait/wait-time";
import { GameProps } from "../game-props";
import { EpisodeID } from "../story/episode";
import { getEpisodes } from "./get-episodes";
import { switchEpisodeSelector } from "./switch-scene/switch-episode-selector";

/**
 * エピソードセレクタ画面を開始するヘルパー関数
 * 本関数ではフェードアウト、フェードインを行う
 * @param props ゲームプロパティ
 * @param initialSelectedEpisodeID 初期選択エピソードID
 * @returns 処理が完了したら発火するPromise
 */
export async function startEpisodeSelector(
  props: Readonly<GameProps>,
  initialSelectedEpisodeID?: EpisodeID,
) {
  await props.fader.fadeOut();
  const episodes = getEpisodes(props);
  const scene = new EpisodeSelector({ ...props, episodes });
  switchEpisodeSelector(props, scene);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  scene.initialize(initialSelectedEpisodeID);
  await props.fader.fadeIn();
}
