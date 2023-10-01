import { EpisodeSelector } from "../../dom-scenes/episode-selector";
import { waitTime } from "../../wait/wait-time";
import { tutorialSelectorConnector } from "../action-connector/tutorial-selector-connection";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import { Episodes, EpisodesInDevelopment } from "../episodes";
import type { GameProps } from "../game-props";

/**
 * エピソードセレクタ画面を開始するヘルパー関数
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function startEpisodeSelector(props: Readonly<GameProps>) {
  await props.fader.fadeOut();
  const episodes = props.canPlayEpisodeInDevelopment
    ? EpisodesInDevelopment
    : Episodes;
  const stages = episodes.map((stage) => ({
    id: stage.id,
    title: stage.title.join(""),
    type: stage.type,
    number: stage.number
  }));
  const scene = new EpisodeSelector(props.resources, stages);
  props.domSceneBinder.bind(scene, tutorialSelectorConnector);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
}
