import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * ログアウト
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onLogout(props: Readonly<GameProps>): Promise<void> {
  await props.fader.fadeOut();
  await props.api.logout();
}

/** アクションタイプ */
const actionType = "Logout";

/** ログアウト時のイベントリスナーコンテナ */
export const logoutContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onLogout(props);
    }
  },
};
