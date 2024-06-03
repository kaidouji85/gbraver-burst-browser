import { Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";

/**
 * アクションコネクタ
 * DOMダイアログとアクションを関連付ける
 * @template X ダイアログのデータ型
 * @param dialog ダイアログ
 * @returns アンサブスクライバ
 */
export type DomDialogActionConnector<X extends DOMDialog> = (
  dialog: X,
) => Unsubscribable[];
