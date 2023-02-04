import { Title } from "../../dom-scenes/title";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<Title>;

/** タイトル画面とゲームアクションを関連付ける */
export const titleConnector: Connector = (scene, gameAction) => [
  scene.notifyLogin().subscribe(() => {
    gameAction.next({
      type: "UniversalLogin",
    });
  }),
  scene.notifyLogout().subscribe(() => {
    gameAction.next({
      type: "Logout",
    });
  }),
  scene.notifyAccountDeletion().subscribe(() => {
    gameAction.next({
      type: "AccountDeleteConsent",
    });
  }),
  scene.notifyArcade().subscribe(() => {
    gameAction.next({
      type: "ArcadeStart",
    });
  }),
  scene.notifyCasualMatch().subscribe(() => {
    gameAction.next({
      type: "CasualMatchStart",
    });
  }),
  scene.notifyConfig().subscribe(() => {
    gameAction.next({
      type: "ConfigChangeStart",
    });
  }),
  scene.notifyTutorial().subscribe(() => {
    gameAction.next({
      type: "TutorialStart",
    });
  }),
];
