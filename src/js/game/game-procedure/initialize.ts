import { invisibleFirstView } from "../../first-view/first-view-visible";
import { titleResourceLoading } from "../../resource/loading/title-resource-loading";
import { loadServiceWorker } from "../../service-worker/load-service-worker";
import { waitTime } from "../../wait/wait-time";
import { GameProps } from "../game-props";
import { applyPerformanceStatsVisibility } from "./apply-performance-stats-visibility";
import { applySoundVolume } from "./apply-sound-volume";
import { playTitleBGM } from "./play-title-bgm";
import { startTitle } from "./start-title";

/**
 * ゲームの初期化
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function initialize(props: GameProps): Promise<void> {
  const startTime = Date.now();
  if (props.isServiceWorkerUsed) {
    props.serviceWorker = await loadServiceWorker();
  }

  const resourceLoading = titleResourceLoading(props.resourceRoot);
  props.resources = await resourceLoading.resources;
  const config = await props.config.load();
  applyPerformanceStatsVisibility(props, config.performanceStatsVisibility);
  await applySoundVolume(props, config);
  await startTitle(props);
  props.interruptScenes.bind(props.resources);
  const latency = Date.now() - startTime;
  await waitTime(500 - latency);
  await props.fader.fadeOut();
  invisibleFirstView();
  await props.fader.fadeIn();
  playTitleBGM(props);
}
