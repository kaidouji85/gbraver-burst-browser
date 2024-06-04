import { map } from "rxjs";

import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { SecretPlayerSelect } from "../../dom-scenes/secret-player-select";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * シークレットプレイヤー画面のアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const secretPlayerSelectConnector =
  (
    props: GameActionManageContainer,
  ): DOMSceneActionConnector<SecretPlayerSelect> =>
  (scene) =>
    props.gameAction.connect([
      scene.notifyOK().pipe(map((a) => ({ ...a, type: "SelectionComplete" }))),
      scene.notifyPrev().pipe(map(() => ({ type: "SelectionCancel" }))),
    ]);
