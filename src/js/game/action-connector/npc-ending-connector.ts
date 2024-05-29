import { NPCEnding } from "../../dom-scenes/npc-ending";
import type { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<NPCEnding>;

/** NPCルートエンディング画面とゲームアクションを関連付ける */
export const npcEndingConnector: Connector = (scene, gameAction) => [
  scene.notifyFinish().subscribe(() => {
    gameAction.next({
      type: "EndNPCEnding",
    });
  }),
];
