import { BatteryCommand, GameState, PlayerState } from "gbraver-burst-core";

import {
  BatteryCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusInBurstButton } from "../../focus";
import { shouldBurst } from "../captions";
import { BurstTutorialProps } from "../props";
import { BurstTutorialState } from "../state";
import { canNotChangeBattery } from "../stories/can-not-change-battery";
import { doBurstToRecoverBattery } from "../stories/do-burst-to-recover-battery";
import { notDefense5Carelessly } from "../stories/not-defense5-carelessly";
import { redoBatterySelect } from "../stories/redo-battery-select";
import { shouldDefense5 } from "../stories/should-defense5";
import { shouldDefense5Again } from "../stories/should-defense5-again";

/**
 * このターンにプレイヤーが死亡するか否かを判定する
 * @param params プレイヤー死亡判定パラメータ
 * @returns プレイヤーが死亡する場合はtrue、そうでない場合はfalse
 */
function isPlayerDeath(params: {
  /** 最終ステート */
  lastState: GameState;
  /** プレイヤーステート */
  player: PlayerState;
  /** 敵ステート */
  enemy: PlayerState;
  /** プレイヤーが出したバッテリーコマンド */
  command: BatteryCommand;
}) {
  const { lastState, player, enemy, command } = params;
  const isEnemyTurn = lastState.activePlayerId !== player.playerId;
  const isNotBattery5Command = command.battery !== 5;
  const isEnemyPowerGreaterThanPlayerHP =
    player.armdozer.hp <= enemy.armdozer.power;
  const isEnemyFullBattery =
    enemy.armdozer.battery === enemy.armdozer.maxBattery;
  return (
    isEnemyTurn &&
    isNotBattery5Command &&
    isEnemyPowerGreaterThanPlayerHP &&
    isEnemyFullBattery
  );
}

/**
 * 初回、2回目以降で「5防御しないと負け」を切り替えるヘルパー関数
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
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
 * バッテリーコマンドが選択されていない場合のイベント終了情報
 * @param props イベントプロパティ
 * @returns イベント終了情報
 */
const notRunning = (
  props: Readonly<BatteryCommandSelected & BurstTutorialProps>,
): Ret => ({
  state: props.state,
  cancel: { isCommandCanceled: false },
});

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @returns イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected & BurstTutorialProps>,
): Promise<Ret> {
  const lastState = props.stateHistory.at(-1);
  const player = lastState?.players.find((v) => v.playerId === props.playerId);
  const enemy = lastState?.players.find((v) => v.playerId !== props.playerId);
  if (!lastState || !player || !enemy) {
    return notRunning(props);
  }

  const willPlayerDeath = isPlayerDeath({
    lastState,
    player,
    enemy,
    command: props.battery,
  });
  const isPlayerFullBattery =
    player.armdozer.battery === player.armdozer.maxBattery;
  if (willPlayerDeath && !isPlayerFullBattery && player.armdozer.enableBurst) {
    await defense5(props);
    await doBurstToRecoverBattery(props);
    await focusInBurstButton(props, shouldBurst);
    return {
      state: { ...props.state, isLoseIfNoDefense5Complete: true },
      cancel: { isCommandCanceled: true },
    };
  }

  if (
    willPlayerDeath &&
    !isPlayerFullBattery &&
    !player.armdozer.enableBurst &&
    !player.pilot.enableSkill
  ) {
    await defense5(props);
    await canNotChangeBattery(props);
    return {
      state: { ...props.state, isLoseIfNoDefense5Complete: true },
      cancel: { isCommandCanceled: false },
    };
  }

  if (willPlayerDeath && isPlayerFullBattery) {
    props.view.hud.gameObjects.batterySelector.toBatterySilently(5);
    await defense5(props);
    props.state.isLoseIfNoDefense5Complete
      ? await notDefense5Carelessly(props)
      : await redoBatterySelect(props);
    return {
      state: { ...props.state, isLoseIfNoDefense5Complete: true },
      cancel: { isCommandCanceled: true },
    };
  }

  return notRunning(props);
}
