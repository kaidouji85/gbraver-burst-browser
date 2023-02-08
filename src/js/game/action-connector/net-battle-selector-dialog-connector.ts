import { NetBattleSelectorDialog } from "../../dom-dialogs/net-battle-selector";
import { DomDialogActionConnector } from "../dom-dialog-binder/dom-dialog-action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<NetBattleSelectorDialog>;

/** ネットバトルセレクターダイアログとゲームアクションを関連付ける */
export const netBattleSelectorDialogConnector: Connector = (
  dialog,
  gameAction
) => [
  dialog.notifyCasualMatchSelection().subscribe(() => {
    gameAction.next({ type: "CasualMatchStart" });
  }),
  dialog.notifyClosed().subscribe(() => {
    gameAction.next({ type: "NetBattleCancel" });
  }),
];
