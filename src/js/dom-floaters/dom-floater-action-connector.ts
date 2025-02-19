import { Subject, Unsubscribable } from "rxjs";

import type { GameAction } from "../game/game-actions";

/**
 * @deprecated
 * DOMフローターとアクションを関連づける
 * @template X DOMフローターのデータ型
 * @param floater DOMフローター
 * @param gameAction ゲームアクション通知
 * @returns アンサブスクライバ
 */
export type DomFloaterActionConnector<X> = (
  floater: X,
  gameAction: Subject<GameAction>,
) => Unsubscribable[];
