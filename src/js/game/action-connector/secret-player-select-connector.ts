import { SecretPlayerSelect } from "../../dom-scenes/secret-player-select";
import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<SecretPlayerSelect>;

/** シークレットプレイヤー画面とゲームアクションを関連付ける */
export const secretPlayerSelectConnector: Connector = (scene, gameAction) => [
  scene.notifyOK().subscribe((action) => {
    gameAction.next({
      ...action,
      type: "SelectionComplete",
    });
  }),
  scene.notifyPrev().subscribe(() => {
    gameAction.next({
      type: "SelectionCancel",
    });
  }),
];
