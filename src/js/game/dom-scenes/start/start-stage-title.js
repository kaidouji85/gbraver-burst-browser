// @flow
import {waitTime} from "../../../wait/wait-time";
import {bindScene} from "../bind-scene";
import {discardCurrentScene} from "../discard-current-scene";
import {MAX_LOADING_TIME} from "../max-loading-time";
import type {DOMScenesProps} from "../props";
import {StageTitle} from "../scene/stage-title/stage-title";
import type {StageTitleParam} from "../scene/stage-title/stage-title";

/**
 * ステージタイトル画面を開始する
 *
 * @param props DomScenesプロパティ
 * @param param ステージタイトル画面パラメータ
 * @returns 開始されたNPCステージタイトル画面
 */
export async function startStageTitle(props: DOMScenesProps, param: StageTitleParam): Promise<StageTitle> {
  discardCurrentScene(props);
  const scene = new StageTitle(param);
  bindScene(props, scene);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  return scene;
}