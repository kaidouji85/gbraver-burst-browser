import { fromEvent, map, merge, Observable } from "rxjs";

import { GameAction } from "../game-actions";
import { GameProps } from "../game-props";

/**
 * ゲームアクション通知ストリームを生成する
 * @param props ゲームプロパティ
 * @returns ゲームアクション通知ストリーム
 */
export function createGameActionNotifier(
  props: Readonly<GameProps>,
): Observable<GameAction> {
  const suddenlyBattleEnd: Observable<GameAction> = props.suddenlyBattleEnd
    .stream()
    .pipe(
      map(() => ({
        type: "SuddenlyBattleEnd",
      })),
    );
  const webSocketAPIError: Observable<GameAction> = props.api
    .websocketErrorNotifier()
    .pipe(
      map((error) => ({
        type: "WebSocketAPIError",
        error,
      })),
    );
  const visibilityChange: Observable<GameAction> = fromEvent(
    document,
    "visibilitychange",
  ).pipe(map(() => ({ type: "VisibilityChange" })));
  return merge(
    props.tdBinder.gameActionNotifier(),
    props.domSceneBinder.gameActionNotifier(),
    props.domDialogBinder.gameActionNotifier(),
    props.domFloaters.gameActionNotifier(),
    suddenlyBattleEnd,
    webSocketAPIError,
    visibilityChange,
  );
}
