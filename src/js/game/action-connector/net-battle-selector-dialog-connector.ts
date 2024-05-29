import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { NetBattleSelectorDialog } from "../../dom-dialogs/net-battle-selector";
import { GameAction } from "../game-actions";

/**
 * ネットバトルセレクターダイアログのアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const netBattleSelectorDialogConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DomDialogActionConnector<NetBattleSelectorDialog> =>
  (dialog) =>
    gameAction.connect([
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
