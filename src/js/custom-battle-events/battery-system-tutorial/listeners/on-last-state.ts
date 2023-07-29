import type { GameState } from "gbraver-burst-core";

import type { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { focusInBatterySelector } from "../../focus";
import { defenseBatteryCaption } from "../captions";
import type { BatterySystemTutorialState } from "../state";
import { attackDescription } from "../stories/attack-description";

/**
 * 最終ステートイベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @param attackBatteryCaption 攻撃時のキャプション innerHTML
 * @return ステート更新結果
 */
export async function onLastState(
  props: Readonly<LastState>,
  state: BatterySystemTutorialState,
  attackBatteryCaption: string,
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
    await attackDescription(props, attackBatteryCaption);
  } else {
    await focusInBatterySelector(props);
    props.view.dom.nearBatterySelectorMessageWindow.messages(
      defenseBatteryCaption,
    );
  }

  return state;
}
