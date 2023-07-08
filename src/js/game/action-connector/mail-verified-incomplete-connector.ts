import { MailVerifiedIncomplete } from "../../dom-scenes/mail-verified-incomplete/mail-verified-incomplete";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<MailVerifiedIncomplete>;

/** メール認証未完了画面とゲームアクションを関連付ける */
export const mailVerifiedIncompleteConnector: Connector = (
  scene,
  gameAction,
) => [
  scene.notifyTitleTransition().subscribe(() => {
    gameAction.next({
      type: "ExitMailVerifiedIncomplete",
    });
  }),
  scene.notifyReload().subscribe(() => {
    gameAction.next({
      type: "ReloadRequest",
    });
  }),
];
