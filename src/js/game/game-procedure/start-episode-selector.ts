import { MAX_LOADING_TIME } from "../../dom-scenes/dom-scene-binder/max-loading-time";
import { EpisodeSelector } from "../../dom-scenes/episode-selector";
import { waitTime } from "../../wait/wait-time";
import { EpisodeID } from "../episodes/episode";
import { GameProps } from "../game-props";
import { getEpisodes } from "./get-episodes";
import { switchEpisodeSelector } from "./switch-scene/switch-episode-selector";

/**
 * エピソードセレクタ画面を開始するヘルパー関数
 * 本関数ではフェードアウト、フェードイン、3Dシーンのdisposeを行う
 * @param props ゲームプロパティ
 * @param initialSelectedEpisodeID 初期選択エピソードID
 * @returns 処理が完了したら発火するPromise
 */
export async function startEpisodeSelector(
  props: Readonly<GameProps>,
  initialSelectedEpisodeID?: EpisodeID,
) {
  await props.fader.fadeOut();
  props.tdBinder.dispose();
  const episodes = getEpisodes(props);
  const scene = new EpisodeSelector({
    ...props,
    episodes,
    initialSelectedEpisodeID,
  });
  switchEpisodeSelector(props, scene);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
}
