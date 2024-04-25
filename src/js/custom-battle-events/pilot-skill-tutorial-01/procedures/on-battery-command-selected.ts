import {
  BatteryCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { PilotSkillTutorial01Props } from "../props";
import { PilotSkillTutorial01State } from "../state";
import { noZeroDefense } from "../stories/no-zero-defense";

/**
 * 条件を満たした場合「0防御は即死」を再生する
 * @param props イベントプロパティ
 * @returns 再生した否か、trueで再生した
 */
async function executeNoZeroDefenseIfNeeded(
  props: Readonly<BatteryCommandSelected>,
): Promise<boolean> {
  const lastState = props.stateHistory[props.stateHistory.length - 1];
  if (!lastState) {
    return false;
  }

  const player = lastState.players.find((v) => v.playerId === props.playerId);
  if (!player) {
    return false;
  }

  const isEnemyTurn = lastState.activePlayerId !== props.playerId;
  if (
    isEnemyTurn &&
    0 < player.armdozer.battery &&
    props.battery.battery <= 0
  ) {
    props.view.hud.gameObjects.batterySelector.toBatterySilently(1);
    await noZeroDefense(props);
    invisibleAllMessageWindows(props);
    return true;
  }

  return false;
}

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: PilotSkillTutorial01State;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @returns イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected & PilotSkillTutorial01Props>,
): Promise<Ret> {
  const isNoZeroDefenseExecuted = await executeNoZeroDefenseIfNeeded(props);
  if (isNoZeroDefenseExecuted) {
    return {
      cancel: {
        isCommandCanceled: true,
      },
      state: props.state,
    };
  }

  return {
    cancel: {
      isCommandCanceled: false,
    },
    state: props.state,
  };
}
