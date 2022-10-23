// @flow

import type { DOMSceneActionConnector } from "./dom-scene-action-connector";
import { MailVerifiedIncomplete } from "./scene/mail-verified-incomplete/mail-verified-incomplete";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<MailVerifiedIncomplete>;

/** メール認証未完了画面とゲームアクションを関連付ける */
export const mailVerifiedIncompleteConnector: Connector = (
  scene,
  gameAction
) => [
  scene.gotoTitleNotifier().subscribe(() => {
    gameAction.next({ type: "ExitMailVerifiedIncomplete" });
  }),
  scene.reloadNotifier().subscribe(() => {
    gameAction.next({ type: "ReloadRequest" });
  }),
];
