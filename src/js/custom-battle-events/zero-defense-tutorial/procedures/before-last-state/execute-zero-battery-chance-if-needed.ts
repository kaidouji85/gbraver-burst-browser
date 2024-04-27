import { GameState } from "gbraver-burst-core";

import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { ZeroDefenseTutorialProps } from "../../props";
import { ZeroDefenseTutorialState } from "../../state";
import { zeroBatteryChance } from "../../stories/zero-battery-chance";

/**
 * 条件を満たした場合、0バッテリーチャンスを再生する
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function executeZeroBatteryChanceIfNeeded(
  props: Readonly<LastState & ZeroDefenseTutorialProps>,
): Promise<ZeroDefenseTutorialState> {
  if (props.state.isZeroBatteryChangeComplete) {
    return props.state;
  }

  const foundLastState = props.update[props.update.length - 1];
  if (!foundLastState) {
    return props.state;
  }

  const lastState: GameState = foundLastState;
  const enemy = lastState.players.find((v) => v.playerId !== props.playerId);
  if (!enemy) {
    return props.state;
  }

  const isPlayerTurn = lastState.activePlayerId === props.playerId;
  if (isPlayerTurn && enemy.armdozer.battery === 0 && 0 < enemy.armdozer.hp) {
    await zeroBatteryChance(props);
    return { ...props.state, isZeroBatteryChangeComplete: true };
  }

  return props.state;
}
