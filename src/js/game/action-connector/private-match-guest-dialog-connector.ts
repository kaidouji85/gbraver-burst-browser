import { PrivateMatchGuestDialog } from "../../dom-dialogs/private-match-guest";
import type { DomDialogActionConnector } from "../dom-dialog-binder/dom-dialog-action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<PrivateMatchGuestDialog>;

/** プライベートマッチ（ゲスト）ダイアログとゲームアクションを関連付ける */
export const privateMatchGuestDialogConnector: Connector = () => [];
