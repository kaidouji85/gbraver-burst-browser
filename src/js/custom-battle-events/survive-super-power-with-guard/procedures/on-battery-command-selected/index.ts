import {
  BatteryCommandSelectedEventProps,
  CommandCanceled,
} from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { SurviveSuperPowerWithGuardState } from "../../state";
import { recommendZeroAttack } from "../../stories/recommend-zero-attack";
import { useBattleSimulator } from "../../stories/use-battle-simulator";
import { shouldPlayRecommendZeroAttack } from "./should-play-recommend-zero-attack";
import { shouldPlayUseBattleSimulator } from "./should-play-use-battle-simulator";

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @returns コマンドキャンセル情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<
    BatteryCommandSelectedEventProps & SurviveSuperPowerWithGuardProps
  >,
): Promise<{
  commandCanceled: CommandCanceled;
  state: SurviveSuperPowerWithGuardState;
}> {
  let isCommandCanceled = false;
  let { state } = props;
  if (shouldPlayRecommendZeroAttack(props)) {
    await recommendZeroAttack(props);
    isCommandCanceled = true;
    state = { ...state, isRecommendZeroAttackComplete: true };
  } else if (shouldPlayUseBattleSimulator(props)) {
    await useBattleSimulator(props);
    isCommandCanceled = true;
    state = { ...state, isUseBattleSimulatorComplete: true };
  }
  return { commandCanceled: { isCommandCanceled }, state };
}
