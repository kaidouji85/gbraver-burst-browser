import {
  BatteryCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusInBurstButton } from "../../focus";
import { shouldBurst } from "../captions";
import { BurstTutorialProps } from "../props";
import { BurstTutorialState } from "../state";
import { doBurstToRecoverBattery } from "../stories/do-burst-to-recover-battery";
import { notDefense5Carelessly } from "../stories/not-defense5-carelessly";
import { redoBatterySelect } from "../stories/redo-battery-select";
import { shouldDefense5 } from "../stories/should-defense5";
import { shouldDefense5Again } from "../stories/should-defense5-again";

/**
 * 初回、2回目以降で「5防御しないと負け」を切り替えるヘルパー関数
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function defense5(
  props: Readonly<BatteryCommandSelected & BurstTutorialProps>,
): Promise<void> {
  if (props.eventState.isLoseIfNoDefense5Complete) {
    await shouldDefense5Again(props);
  } else {
    await shouldDefense5(props);
  }
}

/** イベント終了情報 */
type BatteryEventResult = {
  /** イベントステート更新結果 */
  eventState: BurstTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @returns イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected & BurstTutorialProps>,
): Promise<BatteryEventResult> {
  let result: BatteryEventResult = {
    eventState: props.eventState,
    cancel: { isCommandCanceled: false },
  };

  const { lastState } = props;
  const player = lastState.players.find((p) => p.playerId === props.playerId);
  const enemy = lastState.players.find((p) => p.playerId !== props.playerId);
  if (!player || !enemy) {
    return result;
  }

  const willPlayerDeath =
    lastState.activePlayerId === enemy.playerId &&
    enemy.armdozer.battery === enemy.armdozer.maxBattery &&
    props.battery.battery !== 5 &&
    player.armdozer.hp <= enemy.armdozer.power;
  const isPlayerFullBattery =
    player.armdozer.battery === player.armdozer.maxBattery;

  if (willPlayerDeath && !isPlayerFullBattery && player.armdozer.enableBurst) {
    props.event.stopPropagation();
    props.event.preventDefault();

    await defense5(props);
    await doBurstToRecoverBattery(props);
    await focusInBurstButton(props, shouldBurst);
    result = {
      eventState: { ...result.eventState, isLoseIfNoDefense5Complete: true },
      cancel: { isCommandCanceled: true },
    };
  } else if (willPlayerDeath && isPlayerFullBattery) {
    props.event.stopPropagation();
    props.event.preventDefault();

    props.view.hud.gameObjects.batterySelector.toBatterySilently(5);
    await defense5(props);
    if (result.eventState.isLoseIfNoDefense5Complete) {
      await notDefense5Carelessly(props);
    } else {
      await redoBatterySelect(props);
    }
    result = {
      eventState: { ...result.eventState, isLoseIfNoDefense5Complete: true },
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  return result;
}
