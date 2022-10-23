// @flow
import type { DOMDialog } from "../../../dom-dialogs/dialog";
import type { StreamSource, Unsubscriber } from "../../../stream/stream";
import type { GameAction } from "../../game-actions";

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
