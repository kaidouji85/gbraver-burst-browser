import { $ReadOnly } from "utility-types";
import type { GameProps } from "../game-props";

/**
 * アカウント削除キャンセル
 *
 * @param props ゲームプロパティ
 */
export function onCancelAccountDeletion(props: $ReadOnly<GameProps>): void {
  props.domDialogBinder.hidden();
}