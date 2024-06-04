import { map } from "rxjs";

import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { PlayerSelect } from "../../dom-scenes/player-select";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * プレイヤーセレクト画面のアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const playerSelectConnector =
  (props: GameActionManageContainer): DOMSceneActionConnector<PlayerSelect> =>
  (scene) =>
    props.gameAction.connect([
      scene
        .notifySelectCompletion()
        .pipe(map((a) => ({ ...a, type: "SelectionComplete" }))),
      scene.notifyPrev().pipe(map(() => ({ type: "SelectionCancel" }))),
    ]);
