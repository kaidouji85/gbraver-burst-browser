import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * プレイヤーによるバトル強制終了
 * @param props ゲームプロパティ
 */
function onForceEndBattle(props: Readonly<GameProps>): void {
  console.log("force end battle", props); // TODO 開発が終わったら消す
}

/** アクションタイプ */
const actionType = "ForceEndBattle";

/** プレイヤーによるバトル強制終了のイベントリスナーコンテナ */
export const forceEndBattleContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onForceEndBattle(props);
    }
  },
};
