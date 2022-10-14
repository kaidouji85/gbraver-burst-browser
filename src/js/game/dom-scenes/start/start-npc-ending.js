// @flow
import type {BGMManager} from "../../../bgm/bgm-manager";
import type {Resources} from "../../../resource";
import {waitTime} from "../../../wait/wait-time";
import {bindScene} from "../bind-scene";
import {discardCurrentScene} from "../discard-current-scene";
import {MAX_LOADING_TIME} from "../max-loading-time";
import type {DOMScenesProps} from "../props";
import {NPCEnding} from "../scene/npc-ending/npc-ending";

/**
 * 新しくNPCエンディング画面を開始する
 *
 * @param props DOMScenesプロパティ
 * @param resources リソース管理オブジェクト
 * @param bgm BGM管理オブジェクト
 * @return 開始されたNPCエンディング画面
 */
export async function startNPCEnding(props: DOMScenesProps, resources: Resources, bgm: BGMManager): Promise<NPCEnding> {
  discardCurrentScene(props);
  const scene = new NPCEnding(resources, bgm);
  bindScene(props, scene);
  props.unsubscribers = [
    scene.endNPCEndingNotifier().subscribe(() => {
      props.gameAction.next({type: 'EndNPCEnding'});
    })
  ];
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  return scene;
}