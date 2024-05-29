import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";
import type { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<WaitingDialog>;

/** 作業待ちダイアログとゲームアクションを関連付ける */
export const waitingDialogConnector: Connector = () => [];
