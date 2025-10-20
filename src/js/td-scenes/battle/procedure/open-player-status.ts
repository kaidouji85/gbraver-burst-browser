import { StatusDialog } from "../../../dom-dialogs/status";
import { BattleSceneProps } from "../props";
import { switchStatus } from "./switch-status";

/**
 * プレイヤーのステータスを開く
 * @param props プロパティ
 */
export function openPlayerStatus(props: Readonly<BattleSceneProps>): void {
  const { stateHistory, playerId } = props;
  const lastState = stateHistory.at(-1);
  if (!lastState) {
    return;
  }

  const player = lastState.players.find((p) => p.playerId === playerId);
  if (!player) {
    return;
  }

  const isPilotHidden =
    props.playerPilotVisibility === "hidden" && player.pilot.enableSkill;
  const dialog = new StatusDialog({
    ...props,
    state: player,
    isEnemy: false,
    isPilotHidden,
  });
  switchStatus(props, dialog);
}
