import { map } from "rxjs";

import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { NetBattleSelectorDialog } from "../../dom-dialogs/net-battle-selector";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * ネットバトルセレクターダイアログのアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const netBattleSelectorDialogConnector =
  (
    props: GameActionManageContainer,
  ): DomDialogActionConnector<NetBattleSelectorDialog> =>
  (dialog) =>
    props.gameAction.connect([
      dialog
        .notifyCasualMatchSelection()
        .pipe(map(() => ({ type: "CasualMatchStart" }))),
      dialog
        .notifyPrivateMatchHostSelection()
        .pipe(map(() => ({ type: "PrivateMatchHostStart" }))),
      dialog
        .notifyPrivateMatchGuestSelection()
        .pipe(map(() => ({ type: "PrivateMatchGuestStart" }))),
      dialog.notifyClosed().pipe(map(() => ({ type: "NetBattleCancel" }))),
    ]);
