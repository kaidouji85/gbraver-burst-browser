import type { StreamSource, Unsubscriber } from "../../stream/stream";
import type { GameAction } from "../game-actions";

/**
 * DOMフローターとアクションを関連づける
 * @template X DOMフローターのデータ型
 * @param floater DOMフローター
 * @param gameAction ゲームアクション通知
 * @return アンサブスクライバ
 */
export type DomFloaterActionConnector<X> = (
  floater: X,
  gameAction: StreamSource<GameAction>
) => Unsubscriber[];
