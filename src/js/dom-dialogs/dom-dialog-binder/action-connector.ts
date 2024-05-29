import { Subject, Unsubscribable } from "rxjs";

import type { DOMDialog } from "../dialog";
import type { GameAction } from "../../game/game-actions";

/**
 * ゲームアクションコネクタ
 * DOMダイアログとゲームアクションを関連付ける
 *
 * @template X ダイアログのデータ型
 * @param dialog ダイアログ
 * @param gameAction ゲームアクションストリーム
 * @returns ゲームションションのアンサブスクライブ
 */
export type DomDialogActionConnector<X extends DOMDialog> = (
  dialog: X,
  gameAction: Subject<GameAction>,
) => Unsubscribable[];
