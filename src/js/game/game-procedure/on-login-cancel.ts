import { $ReadOnly } from "utility-types";
import type { GameProps } from "../game-props";

/**
 * ログイン中断
 *
 * @param props ゲームプロパティ
 */
export function onLoginCancel(props: $ReadOnly<GameProps>): void {
  props.domDialogBinder.hidden();
}