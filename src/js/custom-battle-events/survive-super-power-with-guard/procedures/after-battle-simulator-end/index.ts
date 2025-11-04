import { BattleSimulatorEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { SurviveSuperPowerWithGuardState } from "../../state";
import { willNotSurviveCurrentBattery } from "../../stories/will-not-survive-current-battery";
import { willSurviveCurrentBattery } from "../../stories/will-survive-current-battery";
import { willPlayerDieWithCurrentBattery } from "../will-player-die-with-current-battery";

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
  const willPlayerDie = willPlayerDieWithCurrentBattery(props);
  if (shouldPlaySurviveEvent && !willPlayerDie) {
    await willSurviveCurrentBattery(props);
    state = { ...state, isSurviveCheckComplete: true };
  } else if (shouldPlaySurviveEvent && willPlayerDie) {
    await willNotSurviveCurrentBattery(props);
    state = { ...state, isSurviveCheckComplete: true };
  }

  return state;
}
