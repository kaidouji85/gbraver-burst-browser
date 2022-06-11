// @flow
import type {WebSocketAPIError} from "../game-actions";
import type {GameProps} from "../game-props";

/**
 * WebSocketAPIエラー時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 */
export function onWebSocketAPIError(props: $ReadOnly<GameProps>, action: WebSocketAPIError): void {
  props.domDialogs.startNetworkError(props.resources, {type: 'GotoTitle'});
  throw action;
}