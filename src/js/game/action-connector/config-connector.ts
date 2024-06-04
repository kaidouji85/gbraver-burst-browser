import { map } from "rxjs";

import { Config } from "../../dom-scenes/config";
import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * 設定画面のアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const configConnector =
  (props: GameActionManageContainer): DOMSceneActionConnector<Config> =>
  (scene) =>
    props.gameAction.connect([
      scene.notifyPrev().pipe(map(() => ({ type: "ConfigChangeCancel" }))),
      scene
        .notifyConfigChanges()
        .pipe(map((config) => ({ type: "ConfigChangeComplete", config }))),
    ]);
