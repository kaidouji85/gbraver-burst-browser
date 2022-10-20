// @flow
import type { WebSocketAPIUnintentionalClose } from "../game-actions";
import type { GameProps } from "../game-props";

/**
 * WebSocketAPI意図しない切断時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 */
export function onWebSocketAPIUnintentionalClose(
  props: $ReadOnly<GameProps>,
  action: WebSocketAPIUnintentionalClose
): void {
  props.domDialogs.startNetworkError(props.resources, { type: "GotoTitle" });
  throw action;
}
