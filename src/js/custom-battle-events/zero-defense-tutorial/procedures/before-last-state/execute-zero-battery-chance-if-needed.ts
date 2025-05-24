import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ZeroDefenseTutorialProps } from "../../props";
import { ZeroDefenseTutorialState } from "../../state";
import { zeroBatteryChance } from "../../stories/zero-battery-chance";

/**
 * 条件を満たした場合、0バッテリーチャンスを再生する
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function executeZeroBatteryChanceIfNeeded(
  props: Readonly<LastStateEventProps & ZeroDefenseTutorialProps>,
): Promise<ZeroDefenseTutorialState> {
  if (props.eventState.isZeroBatteryChangeComplete) {
    return props.eventState;
  }

  const { lastState } = props;
  const enemy = lastState.players.find((v) => v.playerId !== props.playerId);
  if (!enemy) {
    return props.eventState;
  }

  const isPlayerTurn = lastState.activePlayerId === props.playerId;
  if (isPlayerTurn && enemy.armdozer.battery === 0 && 0 < enemy.armdozer.hp) {
    await zeroBatteryChance(props);
    return { ...props.eventState, isZeroBatteryChangeComplete: true };
  }

  return props.eventState;
}
