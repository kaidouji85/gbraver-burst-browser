import {PilotSkillTutorial02State} from "../state";
import {BatteryCommandSelected, CommandCanceled} from "../../../td-scenes/battle/custom-battle-event";
import {noZeroDefense} from "../stories/no-zero-defense";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: PilotSkillTutorial02State;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * 条件を満たした場合「0防御しない」を再生する
 * @param props イベントプロパティ
 * @return 再生した否か、trueで再生した
 */
async function doNoZeroDefenseOrNothing(
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
    player.armdozer.enableBurst &&
    0 < player.armdozer.battery
  ) {
    await noZeroDefense(props);
    return true;
  }

  return false;
}

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @param state イベントステート
 * @return イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected>,
  state: Readonly<PilotSkillTutorial02State>
): Promise<Ret> {
  const isNoZeroDefensePlayed = await doNoZeroDefenseOrNothing(props);
  if (isNoZeroDefensePlayed) {
    return {
      state,
      cancel: {
        isCommandCanceled: true,
      }
    };
  }


  return {
    state,
    cancel: {
      isCommandCanceled: false,
    }
  };
}