import { Config } from "../../dom-scenes/config";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<Config>;

/** 設定画面とゲームアクションを関連付ける */
export const configConnector: Connector = (scene, gameAction) => [
  scene.notifyPrev().subscribe(() => {
    gameAction.next({
      type: "ConfigChangeCancel",
    });
  }),
  scene.notifyConfigChanges().subscribe((config) => {
    gameAction.next({
      type: "ConfigChangeComplete",
      config,
    });
  }),
];
