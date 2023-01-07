import { NPCEnding } from "../../dom-scenes/npc-ending/npc-ending";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<NPCEnding>;

/** NPCルートエンディング画面とゲームアクションを関連付ける */
export const npcEndingConnector: Connector = (scene, gameAction) => [scene.endNPCEndingNotifier().subscribe(() => {
  gameAction.next({
    type: "EndNPCEnding"
  });
})];