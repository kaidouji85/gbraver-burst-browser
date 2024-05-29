import { NetBattleSelectorDialog } from "../../dom-dialogs/net-battle-selector";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<NetBattleSelectorDialog>;

/** ネットバトルセレクターダイアログとゲームアクションを関連付ける */
export const netBattleSelectorDialogConnector: Connector = (
  dialog,
  gameAction,
) => [
  dialog.notifyCasualMatchSelection().subscribe(() => {
    gameAction.next({ type: "CasualMatchStart" });
  }),
  dialog.notifyPrivateMatchHostSelection().subscribe(() => {
    gameAction.next({ type: "PrivateMatchHostStart" });
  }),
  dialog.notifyPrivateMatchGuestSelection().subscribe(() => {
    gameAction.next({ type: "PrivateMatchGuestStart" });
  }),
  dialog.notifyClosed().subscribe(() => {
    gameAction.next({ type: "NetBattleCancel" });
  }),
];
