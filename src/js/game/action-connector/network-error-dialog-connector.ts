import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import type { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<NetworkErrorDialog>;

/** 通信エラー ダイアログとゲームアクションを関連付ける */
export const networkErrorDialogConnector: Connector = (dialog, gameAction) => [
  dialog.notifyPostNetworkError().subscribe((postNetworkError) => {
    gameAction.next({
      type: "EndNetworkError",
      postNetworkError,
    });
  }),
];
