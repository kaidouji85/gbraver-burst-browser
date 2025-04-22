import { invisibleFirstView } from "../../first-view/first-view-visible";
import { loadBootResources } from "../../resource/loading/load-boot-resources";
import { loadSharedResources } from "../../resource/loading/load-shared-resources";
import { loadServiceWorker } from "../../service-worker/load-service-worker";
import { waitTime } from "../../wait/wait-time";
import { GameProps } from "../game-props";
import { applyBattleWindowFontSize } from "./apply-battle-window-font-size";
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

  const resourceLoading = loadBootResources(props);
  props.resources = await resourceLoading.resources;
  const config = await props.config.load();
  applyPerformanceStatsVisibility(props, config.performanceStatsVisibility);
  applyBattleWindowFontSize(config.battleWindowFontSize);
  await applySoundVolume(props, config);
  await startTitle(props);
  props.interruptScenes.bind(props.resources);
  const latency = Date.now() - startTime;
  await waitTime(500 - latency);
  await props.fader.fadeOut();
  invisibleFirstView();
  await props.fader.fadeIn();
  playTitleBGM(props);
  props.sharedResourceState = {
    type: "Loading",
    resourceLoading: loadSharedResources(props),
  };
}
