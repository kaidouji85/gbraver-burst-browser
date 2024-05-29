import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";

/** 
 * 作業待ちダイアログのアクションコネクタを生成する
 * @returns アクションコネクタ
 */
export const waitingDialogConnector: DomDialogActionConnector<WaitingDialog> = () => [];
