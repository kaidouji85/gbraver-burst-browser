import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { SecretPlayerSelect } from "../../dom-scenes/secret-player-select";
import { GameAction } from "../game-actions";

/**
 * シークレットプレイヤー画面のアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const secretPlayerSelectConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DOMSceneActionConnector<SecretPlayerSelect> =>
  (scene) =>
    gameAction.connect([
      scene.notifyOK().pipe(map((a) => ({ ...a, type: "SelectionComplete" }))),
      scene.notifyPrev().pipe(map(() => ({ type: "SelectionCancel" }))),
    ]);
