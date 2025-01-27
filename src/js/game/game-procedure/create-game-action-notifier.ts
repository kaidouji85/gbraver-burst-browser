import { fromEvent, map, merge, Observable } from "rxjs";

import { GameAction } from "../game-actions";
import { GameProps } from "../game-props";

/**
 * バトル強制終了の通知ストリームを生成する
 * @param props ゲームプロパティ
 * @returns バトル強制終了の通知ストリーム
 */
const createSuddenlyBattleEnd = (
  props: Readonly<GameProps>,
): Observable<GameAction> =>
  props.suddenlyBattleEnd
    .stream()
    .pipe(map(() => ({ type: "SuddenlyBattleEnd" })));

/**
 * WebSocketAPIエラーの通知ストリームを生成する
 * @param props ゲームプロパティ
 * @returns WebSocketAPIエラーの通知ストリーム
 */
const createWebSocketAPIError = (
  props: Readonly<GameProps>,
): Observable<GameAction> =>
  props.api
    .websocketErrorNotifier()
    .pipe(map((error) => ({ type: "WebSocketAPIError", error })));

/**
 * visibilitychangeイベントの通知ストリームを生成する
 * @returns visibilitychangeイベントの通知ストリーム
 */
const createVisibilityChange = (): Observable<GameAction> =>
  fromEvent(document, "visibilitychange").pipe(
    map(() => ({ type: "VisibilityChange" })),
  );

/**
 * unhandledrejectionイベント通知ストリームを生成する
 * @returns unhandledrejectionイベント通知ストリーム
 */
const createUnhandledrejection = (): Observable<GameAction> =>
  fromEvent<PromiseRejectionEvent>(window, "unhandledrejection").pipe(
    map((event) => ({ type: "UnhandledRejection", event })),
  );

/**
 * ゲームアクション通知ストリームを生成する
 * @param props ゲームプロパティ
 * @returns ゲームアクション通知ストリーム
 */
export const createGameActionNotifier = (
  props: Readonly<GameProps>,
): Observable<GameAction> =>
  merge(
    props.gameAction.notify(),
    props.domFloaters.gameActionNotifier(),
    createSuddenlyBattleEnd(props),
    createWebSocketAPIError(props),
    createVisibilityChange(),
    createUnhandledrejection(),
  );
