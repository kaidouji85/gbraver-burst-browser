// @flow
import type { StreamSource, Unsubscriber } from "../../../stream/stream";
import type { GameAction } from "../../game-actions";
import type { DOMDialog } from "../dialog";

/**
 * ゲームアクションコネクタ
 * DOMダイアログとゲームアクションを関連付ける
 *
 * @template X ダイアログのデータ型
 * @param dialog ダイアログ
 * @param gameAction ゲームアクションストリーム
 * @return ゲームションションのアンサブスクライブ
 */
export type DomDialogActionConnector<X: DOMDialog> = (
  dialog: X,
  gameAction: StreamSource<GameAction>
) => Unsubscriber[];
