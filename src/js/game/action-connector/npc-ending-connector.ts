import { map } from "rxjs";

import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { NPCEnding } from "../../dom-scenes/npc-ending";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * NPCルートエンディング画面のアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const npcEndingConnector =
  (props: GameActionManageContainer): DOMSceneActionConnector<NPCEnding> =>
  (scene) =>
    props.gameAction.connect([
      scene.notifyFinish().pipe(map(() => ({ type: "EndNPCEnding" }))),
    ]);
