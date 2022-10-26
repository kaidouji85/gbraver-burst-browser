// @flow
import type { GameState } from "gbraver-burst-core";

import type { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { focusInBatterySelector } from "../../focus";
import { attackBatteryCaption, defenseBatteryCaption } from "../captions";
import type { BatterySystemTutorialState } from "../state";

/**
 * 最終ステートイベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
export async function onLastState(
  props: $ReadOnly<LastState>,
  state: BatterySystemTutorialState
): Promise<BatterySystemTutorialState> {
  if (state.isBatterySystemDescriptionComplete) {
    return state;
  }

  const foundLastState = props.update[props.update.length - 1];
  if (!foundLastState) {
    return state;
  }

  const lastState: GameState = foundLastState;
  if (lastState.effect.name !== "InputCommand") {
    return state;
  }

  const isMyTurn = lastState.activePlayerId === props.playerId;
  if (isMyTurn) {
    await focusInBatterySelector(props, attackBatteryCaption);
  } else {
    await focusInBatterySelector(props, defenseBatteryCaption);
  }
  return state;
}
