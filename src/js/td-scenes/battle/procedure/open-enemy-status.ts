import { StatusDialog } from "../../../dom-dialogs/status";
import { BattleSceneProps } from "../props";
import { switchStatus } from "./switch-status";

/**
 * 敵のステータスを開く
 * @param props プロパティ
 */
export function openEnemyStatus(props: Readonly<BattleSceneProps>): void {
  const { stateHistory, playerId } = props;
  const lastState = stateHistory.at(-1);
  if (!lastState) {
    return;
  }

  const enemy = lastState.players.find((p) => p.playerId !== playerId);
  if (!enemy) {
    return;
  }

  const isPilotHidden = enemy.pilot.enableSkill;
  const dialog = new StatusDialog({
    ...props,
    state: enemy,
    isEnemy: true,
    isPilotHidden,
  });
  switchStatus(props, dialog);
}
