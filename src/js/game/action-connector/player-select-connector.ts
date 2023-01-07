import { PlayerSelect } from "../../dom-scenes/player-select";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<PlayerSelect>;

/** プレイヤーセレクト画面とゲームアクションを関連付ける */
export const playerSelectConnector: Connector = (scene, gameAction) => [scene.decideNotifier().subscribe(v => {
  gameAction.next({
    type: "SelectionComplete",
    armdozerId: v.armdozerId,
    pilotId: v.pilotId
  });
}), scene.prevNotifier().subscribe(() => {
  gameAction.next({
    type: "SelectionCancel"
  });
})];