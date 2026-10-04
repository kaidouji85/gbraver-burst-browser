import { SurviveSuperPowerWithGuardState } from "../../state";

/**
 * 生存イベントを再生すべきか判定する
 * @param state ステート
 * @returns 生存イベントを再生すべきならtrue
 */
export function shouldPlaySurviveEvent(
  state: SurviveSuperPowerWithGuardState,
): boolean {
  return state.isUseBattleSimulatorComplete && !state.isSurviveCheckComplete;
}
