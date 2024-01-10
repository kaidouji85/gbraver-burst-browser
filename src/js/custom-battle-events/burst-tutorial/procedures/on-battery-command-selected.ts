import type { GameState } from "gbraver-burst-core";

import type {
  BatteryCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusInBurstButton } from "../../focus";
import { shouldBurst } from "../captions";
import { BurstTutorialProps } from "../props";
import type { BurstTutorialState } from "../state";
import { canNotChangeBattery } from "../stories/can-not-change-battery";
import { doBurstToRecoverBattery } from "../stories/do-burst-to-recover-battery";
import { notDefense5Carelessly } from "../stories/not-defense5-carelessly";
import { redoBatterySelect } from "../stories/redo-battery-select";
import { shouldDefense5 } from "../stories/should-defense5";
import { shouldDefense5Again } from "../stories/should-defense5-again";

/**
 * 初回、2回目以降で「5防御しないと負け」を切り替えるヘルパー関数
 * @param props イベントプロパティ
 * @param state ステート
 * @return 処理が完了したら発火するPromise
 */
async function defense5(
  props: Readonly<BatteryCommandSelected & BurstTutorialProps>,
): Promise<void> {
  props.state.isLoseIfNoDefense5Complete
    ? await shouldDefense5Again(props)
    : await shouldDefense5(props);
}

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BurstTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @return イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected & BurstTutorialProps>,
): Promise<Ret> {
  const isBattery5Command = props.battery.battery === 5;
  const foundLastState = props.stateHistory[props.stateHistory.length - 1];
  if (!foundLastState || isBattery5Command) {
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  const lastState: GameState = foundLastState;
  const isPlayerTurn = lastState.activePlayerId === props.playerId;
  const player = lastState.players.find((v) => v.playerId === props.playerId);
  const enemy = lastState.players.find((v) => v.playerId !== props.playerId);
  if (isPlayerTurn || !player || !enemy) {
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  const isEnemyPowerLessThanPlayerHP =
    enemy.armdozer.power < player.armdozer.hp;
  const isNotEnemyFullBattery =
    enemy.armdozer.battery !== enemy.armdozer.maxBattery;
  if (isEnemyPowerLessThanPlayerHP || isNotEnemyFullBattery) {
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  const isPlayerFullBattery =
    player.armdozer.battery === player.armdozer.maxBattery;
  const enableBurst = player.armdozer.enableBurst;
  const enablePilotSkill = player.pilot.enableSkill;
  if (!isPlayerFullBattery && enableBurst) {
    await defense5(props);
    await doBurstToRecoverBattery(props);
    await focusInBurstButton(props, shouldBurst);
    return {
      state: {
        ...props.state,
        isLoseIfNoDefense5Complete: true,
      },
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  if (!isPlayerFullBattery && !enableBurst && !enablePilotSkill) {
    await defense5(props);
    await canNotChangeBattery(props);
    return {
      state: { ...props.state, isLoseIfNoDefense5Complete: true },
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  if (isPlayerFullBattery) {
    props.view.hud.gameObjects.batterySelector.toBatterySilently(5);
    await defense5(props);
    props.state.isLoseIfNoDefense5Complete
      ? await notDefense5Carelessly(props)
      : await redoBatterySelect(props);
    return {
      state: { ...props.state, isLoseIfNoDefense5Complete: true },
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  return {
    state: props.state,
    cancel: {
      isCommandCanceled: false,
    },
  };
}
