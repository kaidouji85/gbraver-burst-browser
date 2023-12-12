import {
  BatteryCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { PilotSkillTutorial02Props } from "../props";
import { PilotSkillTutorial02State } from "../state";
import { lessThanAttack3 } from "../stories/less-than-attack3";
import { noZeroDefense } from "../stories/no-zero-defense";

/**
 * 条件を満たした場合「0防御しない」を再生する
 * @param props イベントプロパティ
 * @return 再生した否か、trueで再生した
 */
async function executeNoZeroDefenseIfNeeded(
  props: Readonly<BatteryCommandSelected>,
): Promise<boolean> {
  const lastState = props.stateHistory[props.stateHistory.length - 1];
  if (!lastState) {
    return false;
  }

  const player = lastState.players.find((p) => p.playerId === props.playerId);
  if (!player) {
    return false;
  }

  const isEnemyTurn = lastState.activePlayerId !== props.playerId;
  if (
    props.battery.battery <= 0 &&
    isEnemyTurn &&
    0 < player.armdozer.battery
  ) {
    props.view.hud.gameObjects.batterySelector.toBatterySilently(1);
    await noZeroDefense(props);
    return true;
  }

  return false;
}

/**
 * 条件を満たした場合「3未満攻撃だと警告」を再生する
 * @param props イベントプロパティ
 * @return 再生した否か、trueで再生した
 */
async function executeLessThanAttack3IfNeeded(
  props: Readonly<BatteryCommandSelected & PilotSkillTutorial02Props>,
): Promise<boolean> {
  const lastState = props.stateHistory[props.stateHistory.length - 1];
  if (!lastState) {
    return false;
  }

  const player = lastState.players.find((p) => p.playerId === props.playerId);
  if (!player) {
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

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: PilotSkillTutorial02State;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @return イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected & PilotSkillTutorial02Props>,
): Promise<Ret> {
  const isNoZeroDefenseExecuted = await executeNoZeroDefenseIfNeeded(props);
  if (isNoZeroDefenseExecuted) {
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  const isLessThanAttack3Executed = await executeLessThanAttack3IfNeeded(props);
  if (isLessThanAttack3Executed) {
    return {
      state: props.state,
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
