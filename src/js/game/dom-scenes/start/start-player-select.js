// @flow
import type {Resources} from "../../../resource";
import {waitTime} from "../../../wait/wait-time";
import {bindScene} from "../bind-scene";
import {discardCurrentScene} from "../discard-current-scene";
import {MAX_LOADING_TIME} from "../max-loading-time";
import type {DOMScenesProps} from "../props";
import {PlayerSelect} from "../scene/player-select";

/**
 * 新しくプレイヤー選択画面を開始する
 *
 * @param props DOMScenesプロパティ
 * @param resources リソース管理オブジェクト
 * @return 開始されたプレイヤー選択画面
 */
export async function startPlayerSelect(props: DOMScenesProps, resources: Resources): Promise<PlayerSelect> {
  discardCurrentScene(props);
  const scene = new PlayerSelect(resources);
  bindScene(props, scene);
  props.unsubscribers = [
    scene.decideNotifier().subscribe(v => {
      props.gameAction.next({type: 'SelectionComplete', armdozerId: v.armdozerId, pilotId: v.pilotId});
    }),
    scene.prevNotifier().subscribe(() => {
      props.gameAction.next({type: 'SelectionCancel'});
    }),
  ];
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  return scene;
}