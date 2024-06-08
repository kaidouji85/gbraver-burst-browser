import type { GameProps } from "../../game-props";

/**
 * ログイン中断
 *
 * @param props ゲームプロパティ
 */
export function onLoginCancel(props: Readonly<GameProps>): void {
  props.domDialogBinder.hidden();
}
