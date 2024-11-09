import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * プレイヤーによるバトルのリトライ
 * @param props ゲームプロパティ
 */
function onForceRetry(props: Readonly<GameProps>): void {
  console.log("force retry", props); // TODO 開発が終わったら消す
}

/** アクションタイプ */
const actionType = "ForceRetry";

/** プレイヤーによるバトルのリトライのイベントリスナーコンテナ */
export const forceRetryContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onForceRetry(props);
    }
  },
};
