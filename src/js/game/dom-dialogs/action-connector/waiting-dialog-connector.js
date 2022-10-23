// @flow

import { WaitingDialog } from "../waiting/waiting-dialog";
import type { DomDialogActionConnector } from "./dom-dialog-action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<WaitingDialog>;

/** 作業待ちダイアログとゲームアクションを関連付ける */
export const waitingDialogConnector: Connector = () => [];
