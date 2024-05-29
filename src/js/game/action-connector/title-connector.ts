import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { Title } from "../../dom-scenes/title";
import { GameAction } from "../game-actions";

/** タイトル画面とゲームアクションを関連付ける */
export const titleConnector =
  (gameAction: ActionManager<GameAction>): DOMSceneActionConnector<Title> =>
  (scene) =>
    gameAction.connect([
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
