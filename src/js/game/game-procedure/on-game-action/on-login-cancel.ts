import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * ログイン中断
 * @param props ゲームプロパティ
 */
function onLoginCancel(props: Readonly<GameProps>): void {
  props.domDialogBinder.hidden();
}

/** アクションタイプ */
const actionType = "LoginCancel";

/** ログイン中断時のイベントリスナーコンテナ */
export const loginCancelContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onLoginCancel(props);
    }
  },
};
