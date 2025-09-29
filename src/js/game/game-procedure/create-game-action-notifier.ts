import { EMPTY, fromEvent, map, merge, Observable } from "rxjs";

import { GameAction } from "../game-actions";
import { GameProps } from "../game-props";
import { OfflineLAN } from "../network-context/offline-lan";
import { Online } from "../network-context/online";

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
 * オンラインネットワークエラーの通知ストリームを生成する
 * @param networkContext ネットワークコンテキスト（オンライン）
 * @returns ネットワークエラーの通知ストリーム
 */
const createOnlineNetworkError = (
  networkContext: Online,
): Observable<GameAction> =>
  networkContext.sdk
    .websocketErrorNotifier()
    .pipe(map((error) => ({ type: "NetworkError", error })));

/**
 * オフラインLANネットワークエラーの通知ストリームを生成する
 * @param networkContext ネットワークコンテキスト（オフラインLAN）
 * @returns ネットワークエラーの通知ストリーム
 */
const createOfflineLANNetworkError = (
  networkContext: OfflineLAN,
): Observable<GameAction> =>
  networkContext.sdk
    .notifyError()
    .pipe(map((error) => ({ type: "NetworkError", error })));

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
 * ポストバトルアクション通知ストリームを生成する
 * @param props ゲームプロパティ
 * @returns ポストバトルアクション通知ストリーム
 */
const createPostBattleAction = (
  props: Readonly<GameProps>,
): Observable<GameAction> =>
  props.postBattle.selectionCompleteNotifier().pipe(
    map((postAction) => ({
      type: "PostBattleAction",
      postAction,
    })),
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
    createPostBattleAction(props),
    createSuddenlyBattleEnd(props),
    props.networkContext.type === "online"
      ? createOnlineNetworkError(props.networkContext)
      : EMPTY,
    props.networkContext.type === "offline-lan"
      ? createOfflineLANNetworkError(props.networkContext)
      : EMPTY,
    createVisibilityChange(),
    createUnhandledrejection(),
  );
