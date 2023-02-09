import { PrivateMatchHostDialog } from "../../dom-dialogs/private-match-host";
import type { DomDialogActionConnector } from "../dom-dialog-binder/dom-dialog-action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<PrivateMatchHostDialog>;

/** プライベートマッチ（ホスト）ダイアログとゲームアクションを関連付ける */
export const privateMatchHostDialogConnector: Connector = () => [];
