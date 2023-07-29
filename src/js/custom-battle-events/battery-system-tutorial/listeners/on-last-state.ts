import type { GameState } from "gbraver-burst-core";

import type { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { focusInBatterySelector } from "../../focus";
import { defenseBatteryCaption } from "../captions";
import type { BatterySystemTutorialState } from "../state";
import { attackDescription } from "../stories/attack-description";

/** パラメータ */
type Params = {
  /** イベントプロパティ */
  props: Readonly<LastState>;
  /** ステート */
  state: BatterySystemTutorialState;
  /** 攻撃時のキャプション innerHTML */
  attackBatteryCaption: string;
};

/**
 * 最終ステートイベント
 * @param params パラメータ
 * @return ステート更新結果
 */
export async function onLastState(
  params: Params,
): Promise<BatterySystemTutorialState> {
  const { props, state, attackBatteryCaption } = params;
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
