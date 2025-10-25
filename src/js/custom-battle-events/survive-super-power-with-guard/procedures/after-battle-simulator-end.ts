import { canBeatDown } from "../../../npc/can-beat-down";
import { BattleSimulatorEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../props";
import { SurviveSuperPowerWithGuardState } from "../state";
import { willNotSurviveCurrentBattery } from "../stories/will-not-survive-current-battery";
import { willSurviveCurrentBattery } from "../stories/will-survive-current-battery";

/**
 * 現在のバッテリーで敵が全力攻撃した時にプレイヤーが死亡するか否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueで死亡
 */
function isPlayerDeathWithCurrentBattery(
  props: Readonly<BattleSimulatorEventProps & SurviveSuperPowerWithGuardProps>,
) {
  const currentBattery =
    props.view.hud.gameObjects.batterySelector.getBattery();
  const { player, enemy } = props;
  return canBeatDown(enemy, enemy.armdozer.battery, player, currentBattery);
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

  const shouldPlaySurviveEvent =
    state.isUseBattleSimulatorComplete && !state.isSurviveCheckComplete;
  const isPlayerDeath = isPlayerDeathWithCurrentBattery(props);
  if (shouldPlaySurviveEvent && !isPlayerDeath) {
    await willSurviveCurrentBattery(props);
    state = { ...state, isSurviveCheckComplete: true };
  } else if (shouldPlaySurviveEvent && isPlayerDeath) {
    await willNotSurviveCurrentBattery(props);
    state = { ...state, isSurviveCheckComplete: true };
  }

  return state;
}
