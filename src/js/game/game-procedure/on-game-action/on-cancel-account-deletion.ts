import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * アカウント削除キャンセル
 * @param props ゲームプロパティ
 */
function onCancelAccountDeletion(props: Readonly<GameProps>): void {
  props.domDialogBinder.hidden();
}

/** アクションタイプ */
const actionType = "CancelAccountDeletion";

/** アカウント削除キャンセル時のイベントリスナーコンテナ */
export const cancelAccountDeletionContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onCancelAccountDeletion(props);
    }
  },
};
