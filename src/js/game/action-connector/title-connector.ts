import { Title } from "../../dom-scenes/title";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<Title>;

/** タイトル画面とゲームアクションを関連付ける */
export const titleConnector: Connector = (scene, gameAction) => [scene.pushLoginNotifier().subscribe(() => {
  gameAction.next({
    type: "UniversalLogin"
  });
}), scene.pushLogoutNotifier().subscribe(() => {
  gameAction.next({
    type: "Logout"
  });
}), scene.pushDeleteAccountNotifier().subscribe(() => {
  gameAction.next({
    type: "AccountDeleteConsent"
  });
}), scene.pushArcadeNotifier().subscribe(() => {
  gameAction.next({
    type: "ArcadeStart"
  });
}), scene.pushCasualMatchNotifier().subscribe(() => {
  gameAction.next({
    type: "CasualMatchStart"
  });
}), scene.pushConfigNotifier().subscribe(() => {
  gameAction.next({
    type: "ConfigChangeStart"
  });
}), scene.pushTutorialNotifier().subscribe(() => {
  gameAction.next({
    type: "TutorialStart"
  });
})];