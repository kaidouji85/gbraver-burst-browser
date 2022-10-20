// @flow
import type { GameProps } from "../game-props";

/**
 * ログイン中断
 *
 * @param props ゲームプロパティ
 */
export function onLoginCancel(props: $ReadOnly<GameProps>): void {
  props.domDialogs.hidden();
}
