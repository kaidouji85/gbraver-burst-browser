import type { GameProps } from "../../game-props";

/**
 * アカウント削除キャンセル
 *
 * @param props ゲームプロパティ
 */
export function onCancelAccountDeletion(props: Readonly<GameProps>): void {
  props.domDialogBinder.hidden();
}
