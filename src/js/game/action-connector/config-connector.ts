import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { Config } from "../../dom-scenes/config";
import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { GameAction } from "../game-actions";

/**
 * 設定画面のアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const configConnector =
  (gameAction: ActionManager<GameAction>): DOMSceneActionConnector<Config> =>
  (scene) =>
    gameAction.connect([
      scene.notifyPrev().pipe(map(() => ({ type: "ConfigChangeCancel" }))),
      scene
        .notifyConfigChanges()
        .pipe(map((config) => ({ type: "ConfigChangeComplete", config }))),
    ]);
