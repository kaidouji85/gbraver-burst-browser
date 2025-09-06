import { StatusDialog } from "../../../../dom-dialogs/status";
import { BattleSceneProps } from "../../props";
import { switchStatus } from "../switch-status";

/**
 * プレイヤーステータスを開く時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onPlayerStatusOpening(props: Readonly<BattleSceneProps>): void {
  const { stateHistory, playerId } = props;
  props.exclusive.execute(async () => {
    const lastState = stateHistory.at(-1);
    if (!lastState) {
      return;
    }

    const player = lastState.players.find((p) => p.playerId === playerId);
    if (!player) {
      return;
    }

    const dialog = new StatusDialog({
      ...props,
      state: player,
      isEnemy: false,
      isPilotHidden: false,
    });
    switchStatus(props, dialog);
  });
}
