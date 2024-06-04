import { map } from "rxjs";

import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { MailVerifiedIncomplete } from "../../dom-scenes/mail-verified-incomplete";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * メール認証未完了画面のアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const mailVerifiedIncompleteConnector =
  (
    props: GameActionManageContainer,
  ): DOMSceneActionConnector<MailVerifiedIncomplete> =>
  (scene) =>
    props.gameAction.connect([
      scene
        .notifyTitleTransition()
        .pipe(map(() => ({ type: "ExitMailVerifiedIncomplete" }))),
      scene.notifyReload().pipe(map(() => ({ type: "ReloadRequest" }))),
    ]);
