import { PlayerSelect } from "../../dom-scenes/player-select";
import type { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<PlayerSelect>;

/** プレイヤーセレクト画面とゲームアクションを関連付ける */
export const playerSelectConnector: Connector = (scene, gameAction) => [
  scene.notifySelectCompletion().subscribe((v) => {
    gameAction.next({
      type: "SelectionComplete",
      armdozerId: v.armdozerId,
      pilotId: v.pilotId,
    });
  }),
  scene.notifyPrev().subscribe(() => {
    gameAction.next({
      type: "SelectionCancel",
    });
  }),
];
