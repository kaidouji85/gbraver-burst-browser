// @flow
import type { GameState } from "gbraver-burst-core";

import type {
  BatteryCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusInBurstButton, focusInPilotButton } from "../../focus";
import { shouldBurst, shouldPilotSkill } from "../captions";
import type { BurstTutorialState, SelectableCommands } from "../state";
import { canNotChangeBattery } from "../stories/can-not-change-battery";
import { doBurstToRecoverBattery } from "../stories/do-burst-to-recover-battery";
import { doPilotSkillToRecoverBattery } from "../stories/do-pilot-skill-to-recover-battery";
import { notDefense5Carelessly } from "../stories/not-defense5-carelessly";
import { redoBatterySelect } from "../stories/redo-battery-select";
import { shouldDefense5 } from "../stories/should-defense5";
import { shouldDefense5Again } from "../stories/should-defense5-again";

/**
 * 初回、2回目以降で「5防御しないと負け」を切り替えるヘルパー関数
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return 処理が完了したら発火するPromise
 */
async function defense5(
  props: $ReadOnly<BatteryCommandSelected>,
  state: BurstTutorialState
): Promise<void> {
  state.isLoseIfNoDefense5Complete
    ? await shouldDefense5Again(props)
    : await shouldDefense5(props);
}

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BurstTutorialState,
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled,
};

/**
 * バッテリーコマンド選択イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: $ReadOnly<BatteryCommandSelected>,
  state: BurstTutorialState
): Promise<Ret> {
  const enableBurstCommand: SelectableCommands[] = ["All"];
  if (!enableBurstCommand.includes(state.selectableCommands)) {
    return { state, cancel: { isCommandCanceled: true } };
  }

  const isBattery5Command = props.battery.battery === 5;
  const foundLastState = state.stateHistory[state.stateHistory.length - 1];
  if (!foundLastState || isBattery5Command) {
    return { state, cancel: { isCommandCanceled: false } };
  }

  const lastState: GameState = foundLastState;
  const isPlayerTurn = lastState.activePlayerId === props.playerId;
  const player = lastState.players.find((v) => v.playerId === props.playerId);
  const enemy = lastState.players.find((v) => v.playerId !== props.playerId);
  if (isPlayerTurn || !player || !enemy) {
    return { state, cancel: { isCommandCanceled: false } };
  }

  const isEnemyPowerLessThanPlayerHP =
    enemy.armdozer.power < player.armdozer.hp;
  const isNotEnemyFullBattery =
    enemy.armdozer.battery !== enemy.armdozer.maxBattery;
  if (isEnemyPowerLessThanPlayerHP || isNotEnemyFullBattery) {
    return { state, cancel: { isCommandCanceled: false } };
  }

  const isPlayerFullBattery =
    player.armdozer.battery === player.armdozer.maxBattery;
  const enableBurst = player.armdozer.enableBurst;
  const enablePilotSkill = player.pilot.enableSkill;
  if (!isPlayerFullBattery && enableBurst) {
    await defense5(props, state);
    await doBurstToRecoverBattery(props);
    await focusInBurstButton(props, shouldBurst);
    return {
      state: {
        ...state,
        isLoseIfNoDefense5Complete: true,
        selectableCommands: "BurstOnly",
      },
      cancel: { isCommandCanceled: true },
    };
  }

  if (!isPlayerFullBattery && !enableBurst && enablePilotSkill) {
    await defense5(props, state);
    await doPilotSkillToRecoverBattery(props);
    await focusInPilotButton(props, shouldPilotSkill);
    return {
      state: {
        ...state,
        selectableCommands: "PilotSkillOnly",
        isLoseIfNoDefense5Complete: true,
      },
      cancel: { isCommandCanceled: true },
    };
  }

  if (!isPlayerFullBattery && !enableBurst && !enablePilotSkill) {
    await defense5(props, state);
    await canNotChangeBattery(props);
    return {
      state: { ...state, isLoseIfNoDefense5Complete: true },
      cancel: { isCommandCanceled: false },
    };
  }

  if (isPlayerFullBattery) {
    await defense5(props, state);
    state.isLoseIfNoDefense5Complete
      ? await notDefense5Carelessly(props)
      : await redoBatterySelect(props);
    return {
      state: { ...state, isLoseIfNoDefense5Complete: true },
      cancel: { isCommandCanceled: true },
    };
  }

  return { state, cancel: { isCommandCanceled: false } };
}
