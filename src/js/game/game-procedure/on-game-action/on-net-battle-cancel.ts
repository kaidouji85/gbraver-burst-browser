import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * ネット対戦キャンセル時の処理
 * @param props ゲームプロパティ
 */
function onNetBattleCancel(props: Readonly<GameProps>): void {
  props.domDialogBinder.hidden();
}

/** アクションタイプ */
const actionType = "NetBattleCancel";

/** ネット対戦キャンセル時のイベントリスナーコンテナ */
export const netBattleCancelContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onNetBattleCancel(props);
    }
  },
};
