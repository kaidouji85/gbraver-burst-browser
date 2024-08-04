import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * ユニバーサルログイン
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onUniversalLogin(props: Readonly<GameProps>): Promise<void> {
  await props.fader.fadeOut();
  await props.api.gotoLoginPage();
}

/** アクションタイプ */
const actionType = "UniversalLogin";

/** ユニバーサルログイン時のイベントリスナーコンテナ */
export const universalLoginContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type == actionType) {
      onUniversalLogin(props);
    }
  },
};
