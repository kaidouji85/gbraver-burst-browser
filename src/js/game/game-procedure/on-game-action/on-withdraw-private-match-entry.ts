import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * ゲストがプライベートマッチエントリを取り下げる
 * @param props ゲームプロパティ
 */
function onWithdrawPrivateMatchEntry(props: Readonly<GameProps>): void {
  props.domDialogBinder.hidden();
}

/** アクションタイプ */
const actionType = "WithdrawPrivateMatchEntry";

/** プライベートマッチエントリ取り下げ時のイベントリスナーコンテナ */
export const withdrawPrivateMatchEntryContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onWithdrawPrivateMatchEntry(props);
  },
};
