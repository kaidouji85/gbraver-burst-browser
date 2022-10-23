// @flow

import { WaitingDialog } from "../waiting/waiting-dialog";
import type { DomDialogActionConnector } from "./dom-dialog-action-connector";

/** 作業待ちダイアログとゲームアクションを関連付ける */
export const waitingDialogConnector: DomDialogActionConnector<
  WaitingDialog
> = () => [];
