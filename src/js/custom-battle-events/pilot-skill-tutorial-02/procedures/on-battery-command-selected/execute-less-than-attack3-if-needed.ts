import { BatteryCommandSelected } from "../../../../td-scenes/battle/custom-battle-event";
import { PilotSkillTutorial02Props } from "../../props";
import { lessThanAttack3 } from "../../stories/less-than-attack3";

/**
 * 条件を満たした場合「3未満攻撃だと警告」を再生する
 * @param props イベントプロパティ
 * @returns 再生した否か、trueで再生した
 */
export async function executeLessThanAttack3IfNeeded(
  props: Readonly<BatteryCommandSelected & PilotSkillTutorial02Props>,
): Promise<boolean> {
  const { lastState } = props;
  const player = lastState.players.find((p) => p.playerId === props.playerId);
  if (player === undefined) {
    return false;
  }

  const isPlayerTurn = lastState.activePlayerId === props.playerId;
  if (
    isPlayerTurn &&
    3 <= player.armdozer.battery &&
    props.state.isShouldAttack3OrMoreComplete &&
    props.battery.battery < 3
  ) {
    props.view.hud.gameObjects.batterySelector.toBatterySilently(3);
    await lessThanAttack3(props);
    return true;
  }

  return false;
}
