import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { MailVerifiedIncomplete } from "../../dom-scenes/mail-verified-incomplete";
import { GameAction } from "../game-actions";

/**
 * メール認証未完了画面のアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const mailVerifiedIncompleteConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DOMSceneActionConnector<MailVerifiedIncomplete> =>
  (scene) =>
    gameAction.connect([
      scene
        .notifyTitleTransition()
        .pipe(map(() => ({ type: "ExitMailVerifiedIncomplete" }))),
      scene.notifyReload().pipe(map(() => ({ type: "ReloadRequest" }))),
    ]);
