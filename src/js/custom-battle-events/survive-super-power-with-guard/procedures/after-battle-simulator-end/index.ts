import { BattleSimulatorEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { SurviveSuperPowerWithGuardState } from "../../state";
import { willNotSurviveCurrentBattery } from "../../stories/will-not-survive-current-battery";
import { shouldPlaySurviveEvent } from "./should-play-survive-event";

/**
 * バトルシミュレーターが閉じられた後のイベント処理
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function afterBattleSimulatorEnd(
  props: Readonly<BattleSimulatorEventProps & SurviveSuperPowerWithGuardProps>,
): Promise<SurviveSuperPowerWithGuardState> {
  let { state } = props;

  if (shouldPlaySurviveEvent(state)) {
    await willNotSurviveCurrentBattery(props);
    state = { ...state, isSurviveCheckComplete: true };
  }

  return state;
}
