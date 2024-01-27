import { MailVerifiedIncomplete } from "../../dom-scenes/mail-verified-incomplete";
import { invisibleFirstView } from "../../first-view/first-view-visible";
import { titleResourceLoading } from "../../resource/loading/title-resource-loading";
import { loadServiceWorker } from "../../service-worker/load-service-worker";
import { waitTime } from "../../wait/wait-time";
import { mailVerifiedIncompleteConnector } from "../action-connector/mail-verified-incomplete-connector";
import type { GameProps } from "../game-props";
import { reflectSoundVolume } from "../reflect-sound-volume";
import { playTitleBGM } from "./play-title-bgm";
import { reflectPerformanceStatsVisibility } from "./reflect-performance-stats-visibility";
import { startTitle } from "./start-title";

/**
 * ゲームの初期化
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function initialize(props: GameProps): Promise<void> {
  const startTime = Date.now();
  if (props.isServiceWorkerUsed) {
    props.serviceWorker = await loadServiceWorker();
  }

  const [isLogin, isMailVerified] = await Promise.all([
    props.api.isLogin(),
    props.api.isMailVerified(),
  ]);
  if (isLogin && !isMailVerified) {
    const mailAddress = await props.api.getMail();
    const scene = new MailVerifiedIncomplete(mailAddress);
    props.domSceneBinder.bind(scene, mailVerifiedIncompleteConnector);
    invisibleFirstView();
    await props.fader.fadeIn();
    return;
  }

  const resourceLoading = titleResourceLoading(props.resourceRoot);
  props.resources = await resourceLoading.resources;
  const config = await props.config.load();
  reflectPerformanceStatsVisibility(props, config.performanceStatsVisibility);
  reflectSoundVolume(props.resources, config);
  await startTitle(props);
  props.interruptScenes.bind(props.resources);
  const latency = Date.now() - startTime;
  await waitTime(500 - latency);
  await props.fader.fadeOut();
  invisibleFirstView();
  await props.fader.fadeIn();
  playTitleBGM(props);
}
