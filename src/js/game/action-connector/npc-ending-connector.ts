import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { NPCEnding } from "../../dom-scenes/npc-ending";
import { GameAction } from "../game-actions";

/**
 * NPCルートエンディング画面のアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const npcEndingConnector =
  (gameAction: ActionManager<GameAction>): DOMSceneActionConnector<NPCEnding> =>
  (scene) =>
    gameAction.connect([
      scene.notifyFinish().pipe(map(() => ({ type: "EndNPCEnding" }))),
    ]);
