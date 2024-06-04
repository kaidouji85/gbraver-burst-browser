import { map } from "rxjs";

import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { Title } from "../../dom-scenes/title";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * タイトル画面とゲームアクションを関連付ける
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const titleConnector =
  (props: GameActionManageContainer): DOMSceneActionConnector<Title> =>
  (scene) =>
    props.gameAction.connect([
      scene.notifyLogin().pipe(map(() => ({ type: "UniversalLogin" }))),
      scene.notifyLogout().pipe(map(() => ({ type: "Logout" }))),
      scene
        .notifyAccountDeletion()
        .pipe(map(() => ({ type: "AccountDeleteConsent" }))),
      scene.notifyArcade().pipe(map(() => ({ type: "ArcadeStart" }))),
      scene.notifyNetBattle().pipe(map(() => ({ type: "NetBattleStart" }))),
      scene.notifyConfig().pipe(map(() => ({ type: "ConfigChangeStart" }))),
      scene.notifyTutorial().pipe(map(() => ({ type: "StoryStart" }))),
    ]);
