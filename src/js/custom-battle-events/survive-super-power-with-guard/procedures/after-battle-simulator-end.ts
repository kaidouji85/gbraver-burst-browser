import { canBeatDown } from "../../../npc/can-beat-down";
import { BattleSimulatorEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../props";
import { SurviveSuperPowerWithGuardState } from "../state";
import { willSurviveCurrentBattery } from "../stories/will-survive-current-battery";

/**
 * 「willSurviveCurrentBattery」を再生するか否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueで再生
 */
export function shouldPlayWillSurviveCurrentBattery(
  props: Readonly<BattleSimulatorEventProps & SurviveSuperPowerWithGuardProps>,
) {
  const currentBattery =
    props.view.hud.gameObjects.batterySelector.getBattery();
  const { player, enemy, state } = props;
  const isPlayerDeath = canBeatDown(
    enemy,
    enemy.armdozer.battery,
    player,
    currentBattery,
  );
  return (
    state.isUseBattleSimulatorComplete &&
    !state.isSurviveCheckComplete &&
    !isPlayerDeath
  );
}

/**
 * バトルシミュレーターが閉じられた後のイベント処理
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function afterBattleSimulatorEnd(
  props: Readonly<BattleSimulatorEventProps & SurviveSuperPowerWithGuardProps>,
): Promise<SurviveSuperPowerWithGuardState> {
  let { state } = props;
  if (shouldPlayWillSurviveCurrentBattery(props)) {
    await willSurviveCurrentBattery(props);
    state = { ...state, isSurviveCheckComplete: true };
  }
  return state;
}
