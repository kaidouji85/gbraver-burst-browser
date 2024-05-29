import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { PlayerSelect } from "../../dom-scenes/player-select";
import { GameAction } from "../game-actions";

/**
 * プレイヤーセレクト画面のアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const playerSelectConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DOMSceneActionConnector<PlayerSelect> =>
  (scene) =>
    gameAction.connect([
      scene
        .notifySelectCompletion()
        .pipe(map((a) => ({ ...a, type: "SelectionComplete" }))),
      scene.notifyPrev().pipe(map(() => ({ type: "SelectionCancel" }))),
    ]);
