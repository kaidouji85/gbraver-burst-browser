import { CancelAccountDeletion } from "../../game-actions/cancel-account-deletion";
import { GameProps } from "../../game-props";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: CancelAccountDeletion;
};

/**
 * アカウント削除キャンセル
 * @param options オプション
 */
export function onCancelAccountDeletion(options: Options): void {
  const { props } = options;
  props.domDialogBinder.hidden();
}
